import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
    GET_SHOW,
    GET_SETLIST
} from '../constants/AppConstants';

export default {
    yearSelected(year) {
        WebAPI.getShows(year)
            .then((shows) => {
                AppDispatcher.dispatch({
                    actionType : GET_SHOW,
                    shows : shows,
                    year : year
                });
            });
    },

    showSelected(show) {
        WebAPI.getSetlist(show)
            .then((setlist) => {
                AppDispatcher.dispatch({
                    actionType : GET_SETLIST,
                    setlist : setlist,
                    show : show
                });
            });
    }
};
