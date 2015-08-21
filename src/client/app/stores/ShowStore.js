import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
    GET_SHOW,
    SHOW_ADDED,
    GET_SETLIST,
    SETLIST_ADDED
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
    
    addChangeListener(callback) {
        this.on(SHOW_ADDED, callback);
        this.on(SETLIST_ADDED, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(SHOW_ADDED, callback);
        this.removeListener(SETLIST_ADDED, callback);
    }
};

let store = new ShowStore();

AppDispatcher.register((action) => {
    switch (action.actionType) {
        case GET_SHOW:
            store.addShows(action.year, action.shows);
            break;
        case GET_SETLIST:
            store.addSetlist(action.show, action.setlist);
            break;
    }
});

export default store;
