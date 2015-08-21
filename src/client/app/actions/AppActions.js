import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
    GET_SHOWS
} from '../constants/AppConstants';

export default {
    yearSelected(year) {
        WebAPI.getShows(year)
            .then((shows) => {
                AppDispatcher.dispatch({
                    actionType : GET_SHOWS,
                    shows : shows,
                    year : year
                });
            });
    }
};
