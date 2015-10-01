import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
    GET_SHOW,
    SHOW_ADDED,
    GET_SETLIST,
    SETLIST_ADDED,
    TRACK_CHANGE,
    TRACK_FINISHED,
    TRACK_FINISHED_NEXT,
    PLAYLIST_CONFIGURED
} from '../constants/AppConstants';

class ShowStore extends EventEmitter {
    constructor(...args) {
        super(...args);
        this.shows = {};
        this.setlists = {};
    }

    addShows(year, shows) {
        if (!this.shows[year])
            this.shows[year] = shows;
        
        this.emit(SHOW_ADDED, {year : year});
    }

    getShows(year) {
        if (this.shows[year])
            return this.shows[year];
        else
            return [];
    }

    getShowInfo(year, showId) {
        if (this.shows[year]) {
            return this.shows[year].reduce(function(cur, prev) {
                if (cur.id === showId) return cur;
                else return prev;
            }, {});
        }

        return {};
    }

    addSetlist(show, setlist) {
        if (!this.setlists[show])
            this.setlists[show] = setlist;

        this.emit(SETLIST_ADDED, {show : show});
    }

    getSetlist(show) {
        if (this.setlists[show])
            return this.setlists[show];
        else
            return [];
    }

    configureSetlist(id, trackIndex) {
        const startTrackIndex = trackIndex || 0,
              setlist = this.setlists[id];
        
        if (setlist && setlist.length > 0 && startTrackIndex < setlist.length) {
            this.emit(PLAYLIST_CONFIGURED, { startTrack : setlist[startTrackIndex] });
        }
    }

    findTrackIndex(id, trackId) {
        if (this.setlists[id]) {
            return this.setlists[id].reduce((prev, cur, i) => {
                if (cur.id === trackId) return i;
                else return prev;
            }, 0);
        } else {
            console.error("ERROR - Could not find setlist with ID = ", id);
            console.error("\tThe trackId was = ", trackId);
            return -1;
        }
    }

    addPlaylistConfiguredListener(callback) {
        this.on(PLAYLIST_CONFIGURED, callback);
    }

    removePlaylistConfiguredListener(callback) {
        this.removeListener(PLAYLIST_CONFIGURED, callback);
    }
    
    addChangeListener(callback) {
        this.on(SHOW_ADDED, callback);
        this.on(SETLIST_ADDED, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(SHOW_ADDED, callback);
        this.removeListener(SETLIST_ADDED, callback);
    }
};

let store = new ShowStore(),
    activeSetlist;

AppDispatcher.register((action) => {
    switch (action.actionType) {
        case GET_SHOW:
            store.addShows(action.year, action.shows);
            break;
        case GET_SETLIST:
            store.addSetlist(action.show, action.setlist);
            activeSetlist = action.show;
            break;
        case TRACK_CHANGE:
            store.configureSetlist(activeSetlist, store.findTrackIndex(activeSetlist, action.track));
            break;
        case TRACK_FINISHED:
            store.configureSetlist(activeSetlist, store.findTrackIndex(activeSetlist, action.track) + action.direction);
            break;
    }
});

export default store;
