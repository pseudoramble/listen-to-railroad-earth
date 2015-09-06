import AppDispatcher from '../dispatcher/AppDispatcher';

import {
    TRACK_CHANGE,
    TRACK_FINISHED
} from '../constants/AppConstants';

export default {
    trackFinished(track) {
        AppDispatcher.dispatch({
            actionType : TRACK_FINISHED,
            track : track.id
        });
    }
};
