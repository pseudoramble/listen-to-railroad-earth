import os
from pathlib import Path

from bs4 import BeautifulSoup

#####################################################
# A big ol' set of constants to try and not forget! #
#####################################################
SHOW_SONGS_DIR = "songs/"
SHOW_METADATA_DIR = "metadata/"

SHOW_SONGS_FILE = SHOW_SONGS_DIR + "%s"
SHOW_METADATA_FILE = SHOW_METADATA_DIR + "%s"

SHOW_DATA_FILE = "show-data/%s"

SHOW_SONG_URL = "http://archive.org/download/%s/%s"

##
# Determine if the given tag is considered a valid 'file' tag.
#
# The parameter is considered valid in the following scenario:
#  * The tag is 'file'
#  * It has children tags of 'format', 'title', track
#  * The 'format' tag's value is 'VBR MP3'
#
# @param {Tag} tag - A BeautifulSoup Tag to examine
# @returns {boolean} - Whether or not the tag meets the expected criteria
##
def is_valid_file(tag):
    if tag.name == 'file':
        file_format = tag.find('format')
        file_title = tag.find('title')
        file_track = tag.find('track')
    
        return file_format.string == 'VBR MP3' and file_title and file_track
    return False

##
# Create a set list for the given show_id.
# Each song on the setlist contains a title, track, and an id.
# The setlist is sorted in track-order.
#
# @param {string} show_id - The ID for this specific show.
# @returns {list<song>} - The songs associated to this show.
##
def build_set_list(show_id):
    def generate_song(f):
        song_id = f['name']
        song_url = SHOW_SONG_URL % (show_id, song_id)
        
        return { 'title' : f.find('title').string,
                 'track' : f.find('track').string,
                 'id' : song_id,
                 'url' : song_url }

    def by_track(song):
        return int(song['track'])

    with open(SHOW_SONGS_FILE % show_id) as show_songs_fd:
        show_songs = show_songs_fd.read()
    
    songs_soup = BeautifulSoup(show_songs)
    
    return sorted([generate_song(f) for f in songs_soup.find_all(is_valid_file)], key=by_track)

##
# Create a show's data, when possible.
# The dataset must include an ID, date, venue, valid setlist, and a location.
# If one of these attributes does not exist, or an issue occurs while trying to
#  find this info out, an empty show is returned.
#
# @param {string} show_id - The ID for this specific show.
# @returns {show} - The show built up from the data.
##
def build_show_data(show_id):
    with open(SHOW_METADATA_FILE % show_id) as show_metadata_fd:
        show_metadata = show_metadata_fd.read()

    try:
        metadata_soup = BeautifulSoup(show_metadata)
    
        date = metadata_soup.find('date'),
        venue = metadata_soup.find('venue'),
        location = metadata_soup.find('coverage')
        setlist = build_set_list(show_id),
        
        if date and venue and location and len(setlist) > 0:
            return {
                'date' : metadata_soup.find('date').string,
                'venue' : metadata_soup.find('venue').string,
                'location' : metadata_soup.find('coverage').string,
                'id' : show_id,
                'setlist' : setlist
            }
        else:
            return {}
    except:
        return {}

#################################################################
# Ah, yes. The 'main' function.                                 #
# Rips through any metadata files it can find.                  #
# Creates a show object for each & writes it to a file.         #
# If an empty show is given, print a warning out to be examined.#
#################################################################
show_ids = list(Path(SHOW_METADATA_DIR).glob('*'))

for show_id in show_ids:
    data = build_show_data(show_id.name)

    if data:
        with open(SHOW_DATA_FILE % show_id.name, 'w') as show_data_fd:
            show_data_fd.write(str(data))
    else:
        print(show_id.name + " - failed to create dataset for this show")
