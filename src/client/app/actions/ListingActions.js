import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
    LISTING_CHANGE,
    GET_SHOW,
    GET_SETLIST,
    TRACK_CHANGE
} from '../constants/AppConstants';

export default {
    listingSelected(listingId, selectionId) {
        if (listingId === "years-listing") {
            WebAPI.getShows(selectionId)
                .then((shows) => {
                    AppDispatcher.dispatch({
                        actionType : GET_SHOW,
                        shows : shows,
                        year : selectionId
                    });
                });
        } else if (listingId === "shows-listing") {
            WebAPI.getSetlist(selectionId)
                .then((setlist) => {
                    AppDispatcher.dispatch({
                        actionType : GET_SETLIST,
                        setlist : setlist,
                        show : selectionId
                    });
                });
        } else if (listingId === "setlist-listing") {
            AppDispatcher.dispatch({
                actionType : TRACK_CHANGE,
                track : selectionId
            });
        }
    }
};
