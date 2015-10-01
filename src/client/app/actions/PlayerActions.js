import AppDispatcher from '../dispatcher/AppDispatcher';

import {
    TRACK_CHANGE,
    TRACK_FINISHED,
    TRACK_FINISHED_NEXT
} from '../constants/AppConstants';

export default {
    trackFinished(track, direction) {
        if (track && track.id) {
            AppDispatcher.dispatch({
                actionType : TRACK_FINISHED,
                track : track.id,
                direction : direction || TRACK_FINISHED_NEXT
            });
        }
    }
};
