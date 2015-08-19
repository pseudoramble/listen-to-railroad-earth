define([], function() {
    var audioTag = document.getElementById("audio-tag");
    var nextTrack = null;
    
    audioTag.onended = function(e) {
        if (nextTrack) {
            _play(nextTrack);
        }
    };

    var _playTrack = function(showId, songId) {
        audioTag.setAttribute("src", "http://archive.org/download/" + showId + "/" + songId);
    };

    var _play = function(target) {
        if (target) {
            var showId = target.getAttribute("data-rre-show-id");
            var songId = target.getAttribute("data-rre-song-id");
            var nextId = target.getAttribute("data-rre-next-id");

            if (showId && songId) {
                _playTrack(showId, songId);
                nextTrack = document.querySelector("a[data-rre-song-id='" + nextId + "']");
            }
        }
    };
    
    return {
        play : function(target) {
            _play(target);
        },

        playTrack : function(showId, songId) {
            _playTrack(showId, songId);
        }
    };
});
