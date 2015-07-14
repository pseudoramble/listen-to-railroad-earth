from bs4 import BeautifulSoup
from urllib import request

#####################################################
# A big ol' set of constants to try and not forget! #
#####################################################
SHOW_IDS_URL = "http://archive.org/advancedsearch.php?q=collection%3Aetree+AND+format%3Amp3+AND+creator%3A%22Railroad+Earth%22&fl[]=identifier&sort[]=date+asc&sort[]=&sort[]=&rows=1500&page=1&callback=callback&output=xml"

SHOW_SONG_URL = "http://archive.org/download/%s/%s_files.xml"
SHOW_SONG_FILE = "songs/%s"

SHOW_METADATA_URL = "https://archive.org/download/%s/%s_meta.xml"
SHOW_METADATA_FILE = "metadata/%s"

#####################################################
# Some stuff this code needs to do includes:        #
#  1. Downloading all of the show's URL's we need   #
#  2. Filtering out VBR type files                  #
#  3. Store all data into our own files             #
#####################################################

def get_show_ids():
    def identifier_strings(tag):
        return tag.has_attr('name') and tag['name'] == 'identifier'
    
    soup = BeautifulSoup(request.urlopen(SHOW_IDS_URL).read(), "xml")
    return [x.string for x in soup.find_all(identifier_strings)]

def fetch_show_metadata(show_id):
    show_url = SHOW_METADATA_URL % (show_id, show_id)
    dest_filename = SHOW_METADATA_FILE % show_id
    
    return request.urlretrieve(show_url, dest_filename)

def fetch_show_songs(show_id):
    show_url = SHOW_SONG_URL % (show_id, show_id)
    dest_filename = SHOW_SONG_FILE % show_id
    
    return request.urlretrieve(show_url, dest_filename)

def fetch_the_data(show_ids):
    for show_id in show_ids:
        fetch_show_songs(show_id)
        fetch_show_metadata(show_id)

# Save these for later
show_ids = get_show_ids()
with open('show-identifiers.txt', 'w') as show_ids_fd:
    show_ids_fd.write('\n'.join(show_ids))

fetch_the_data(show_ids)
