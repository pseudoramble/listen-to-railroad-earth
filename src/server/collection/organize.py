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

def is_valid_file(tag):
    if tag.name == 'file':
        file_format = tag.find('format')
        file_title = tag.find('title')
        file_track = tag.find('track')
    
        return file_format.string == 'VBR MP3' and file_title and file_track
    return False

def build_set_list(show_id):
    def generate_song(f):
        return { 'title' : f.find('title').string, 'track' : f.find('track').string, 'id' : f.find('original').string }

    def by_track(song):
        return int(song['track'])

    with open(SHOW_SONGS_FILE % show_id) as show_songs_fd:
        show_songs = show_songs_fd.read()
    
    songs_soup = BeautifulSoup(show_songs)
    
    return sorted([generate_song(f) for f in songs_soup.find_all(is_valid_file)], key=by_track)
    
def build_show_data(show_id):
    with open(SHOW_METADATA_FILE % show_id) as show_metadata_fd:
        show_metadata = show_metadata_fd.read()

    metadata_soup = BeautifulSoup(show_metadata)
    
    return {
        'date' : metadata_soup.find('date').string,
        'venue' : metadata_soup.find('venue').string,
        'location' : metadata_soup.find('coverage').string,
        'id' : show_id,
        'setlist' : build_set_list(show_id)
        }

show_ids = list(Path(SHOW_METADATA_DIR).glob('*'))

"""
for show_id in show_ids:
    data = build_show_data(show_id.name)

    with open(SHOW_DATA_FILE % show_id.name, 'w') as show_data_fd:
       show_data_fd.write(str(data))
"""

print(build_show_data(show_ids[0].name))
