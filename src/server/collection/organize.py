import os
from pathlib import Path

from bs4 import BeautifulSoup

#####################################################
# A big ol' set of constants to try and not forget! #
#####################################################
SHOW_SONGS_DIR = "songs/"
SHOW_METADATA_DIR = "metadata/"

SHOW_SONG_FILE = SHOW_SONGS_DIR + "%s"
SHOW_METADATA_FILE = SHOW_METADATA_DIR + "%s"

SHOW_DATA_FILE = "show-data/%s"

def is_valid_song(elem):
    pass

def is_valid_format(elem):
    pass

def build_set_list(show_id):
    pass

def build_show_data(show_id):
    print(show_id)
    return ()

show_ids = list(Path(SHOW_METADATA_DIR).glob('*'))

for show_id in show_ids:
    data = build_show_data(show_id.name)

    with open(SHOW_DATA_FILE % show_id.name, 'w') as show_data_fd:
       show_data_fd.write(str(data))
