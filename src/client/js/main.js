require(["dom/column", "audio", "services"], function(column, audio, services) {
    var _place = function(widget, nodeId) {
        if (widget && nodeId) {
            var node = document.getElementById(nodeId);
            
            if (node) {
                widget.setAttribute("id", nodeId);
                node.parentNode.replaceChild(widget, node);
            }
        }
    };

    var _renderYearList = function(data) {
        if (data && data.length > 0) {
            var yearsColumn = column.create(data.map(function(year) {
                return { label : year };
            }), _onYearClicked);
        
            _place(yearsColumn, "years");
        }
    };

    var _renderShowList = function(data) {
        if (data && data.length > 0) {
            var showsColumn = column.create(data.map(function(show) {
                var date = new Date(show.Date);
                
                return {
                    label : show.Venue + ", " + show.Location + " (" + date + ")",
                    dataAttributes : {
                        "data-rre-show-id" : show.Identifier
                    }
                };
            }), _onShowClicked);
            
            _place(showsColumn, "shows");
        }
    };

    var _renderSetlist = function(showId, data) {
        if (showId && data && data.length > 0) {
            var setlistColumn = column.create(data.map(function(track, i) {
                var nextSongId = i < data.length - 1 ? data[i + 1].Identifier : undefined;
                
                return {
                    label : track.Title,
                    dataAttributes : {
                        "data-rre-song-id" : track.Identifier,
                        "data-rre-show-id" : showId,
                        "data-rre-next-id" : nextSongId
                    }
                };
            }), _onSongClicked);

            _place(setlistColumn, "setlist");
        }
    };

    var _onShowClicked = function(e) {
        var showId = e.target.getAttribute("data-rre-show-id");

        if (showId) {
            services.getSetList(showId, _renderSetlist.bind(undefined, showId));
        }
    };
    
    var _onYearClicked = function(e) {
        var year = e.target.innerHTML;

        if (year) {
            services.getShows(year, _renderShowList);
        }
    };

    var _onSongClicked = function(e) {
        if (e.target) {
            audio.play(e.target);
        }
    };

    services.getYears(_renderYearList);
});
