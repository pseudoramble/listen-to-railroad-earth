import os
import socket
import functools
from urllib import request
from concurrent import futures

from bs4 import BeautifulSoup

socket.setdefaulttimeout(30)

#####################################################
# A big ol' set of constants to try and not forget! #
#####################################################
SHOW_IDS_URL = "http://archive.org/advancedsearch.php?q=collection%3Aetree+AND+format%3Amp3+AND+creator%3A%22Railroad+Earth%22&fl[]=identifier&sort[]=date+asc&sort[]=&sort[]=&rows=5000&page=1&callback=callback&output=xml"
SHOW_IDS_FILE = "show-identifiers.txt"

SHOW_SONG_URL = "http://archive.org/download/%s/%s_files.xml"
SHOW_SONG_FILE = "songs/%s"

SHOW_METADATA_URL = "https://archive.org/download/%s/%s_meta.xml"
SHOW_METADATA_FILE = "metadata/%s"

##
# Grab all the show identifiers. This allows us to figure out where we'll get any data.
# Involves querying archive.org for the most recent list of RRE shows.
#
# @returns {list<string>} - A set containing each ID for a particular show
##
def get_show_ids():
    def identifier_strings(tag):
        return tag.has_attr('name') and tag['name'] == 'identifier'
    
    soup = BeautifulSoup(request.urlopen(SHOW_IDS_URL).read(), "xml")
    show_ids = [x.string for x in soup.find_all(identifier_strings)]
         
    return show_ids

def fetch_show_metadata(show_id):
    show_url = SHOW_METADATA_URL % (show_id, show_id)
    dest_filename = SHOW_METADATA_FILE % show_id

    if not os.path.exists(dest_filename):
        return request.urlretrieve(show_url, dest_filename)
    else:
        return ()

def fetch_show_songs(show_id):
    show_url = SHOW_SONG_URL % (show_id, show_id)
    dest_filename = SHOW_SONG_FILE % show_id

    if not os.path.exists(dest_filename):
        return request.urlretrieve(show_url, dest_filename)
    else:
        return ()

show_ids = get_show_ids()    
with futures.ThreadPoolExecutor(max_workers=8) as executor:
    show_metadata = {
        executor.submit(functools.partial(fetch_show_metadata, show_id)): show_id for show_id in show_ids
    }

    show_songs = {
        executor.submit(functools.partial(fetch_show_songs, show_id)): show_id for show_id in show_ids
    }

    for future in futures.as_completed(show_metadata):
        url = show_metadata[future]
        
        try:
            future.result()
        except TimeoutError as timeout_ex:
            print("A timeout occurred when downloading metadata for %s" % url)
        except CancellerError as canceller_ex:
            print("This future was cancelled when download metadata for %s" % url)
        except Exception as future_ex:
            print("An error occurred when downloading metadata for %s" % url)
            print("Message was %s" % future_ex)

    for future in futures.as_completed(show_songs):
        url = show_songs[future]
    
        try:
            future.result()
        except TimeoutError as timeout_ex:
            print("A timeout occurred when downloading song list for %s" % url)
        except CancellerError as canceller_ex:
            print("This future was cancelled when download song list for %s" % url)
        except Exception as future_ex:
            print("An error occurred when downloading song list for %s" % url)
            print("Message was %s" % future_ex)
