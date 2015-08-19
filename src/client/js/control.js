var get_show_collections = function() {
    return {
	2001 : {
	    "2001-01-02" : {
		location : "The Orange Peel, Atlanta, GA",
		setlist : [
		    {
			title : "Drag Him Down",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d01t02_vbr.mp3",
			length : 1234,
			track : 1
		    },
		    {
			title : "Good Life",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d01t03_vbr.mp3",
			length : 54321,
			track : 2
		    }
		]
	    }, 
	    "2001-12-31" : {
		location : "The Filmore East, New York, New York",
		setlist : [
		    {
			title : "Black Bear",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d01t10_vbr.mp3",
			length : 1234,
			track : 1
		    },
		    {
			title : "Head",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d02t03_vbr.mp3",
			length : 54321,
			track : 2
		    }
		]
	    }
	},
	2002 : {
	    "2002-05-06" : {
		location : "The Joint, Hackettstown, NJ",
		setlist : [
		    {
			title : "Drag Him Down",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d01t10_vbr.mp3",
			length : 1234,
			track : 1
		    },
		    {
			title : "Old Dangerfield",
                        url : "https://archive.org/download/tsheaffer2010-02-13.ak4020.owmfr2le.flac16/tsheaffer2010-02-13d01t10_vbr.mp3",
			length : 54321,
			track : 2
		    }
		]
	    }
	}
    };
};

var existing_years = function(data) {
    var years = [];
    for (var year in data) {
	years.push(parseInt(year, 10));
    }

    return years.sort(function(a, b) { return a - b; });
};

var get_shows_info = function(year) {
    var data = get_show_collections()[year];
    var shows_info = [];
    for (var date in data) {
	shows_info.push({ 
	    "name" : date + " : " + data[date].location,
	    "location" : data[date].location,
	    "date" : date
	});
    }

    return shows_info.sort(function(a, b) { return a.date - b.date; });
};

var get_set_list = function(year, show_info) {
    return get_show_collections()[year][show_info.date];
};

var to_minutes = function(seconds) {
    var minutes = (seconds / 60) >> 0;
    var leftover_seconds = ((seconds / 60) - minutes) * 60 >> 0;
    return minutes + ":" + leftover_seconds;
};

var clear_columns = function() {
    var songs_node = document.getElementById("songs");
    var shows_node = document.getElementById("shows");

    while (songs_node.firstChild) {
        songs_node.removeChild(songs_node.firstChild);
    }

    while (shows_node.firstChild) {
        shows_node.removeChild(shows_node.firstChild);
    }
};

var draw_years_list = function(years) {
    var years_col = document.createDocumentFragment();

    years.forEach(function(year) {
	var year_link = document.createElement("a");
	year_link.innerHTML = year;
	year_link.setAttribute("href", "#");
	year_link.onclick = function() {
            clear_columns();
	    draw_show_list(get_shows_info(year), year);
	};

	var year_entry = document.createElement("span");
	year_entry.appendChild(year_link);
	year_entry.setAttribute("class", "entry");

	years_col.appendChild(year_entry);
    });
    
    document.getElementById("years").appendChild(years_col);
};

var draw_show_list = function(shows_info, year) {
    var frag = document.createDocumentFragment();
    var shows_col = document.createElement("div");
    shows_col.setAttribute("class", "box");
    shows_col.setAttribute("id", "shows");

    shows_info.forEach(function (show_info) {
	var show_name_link = document.createElement("a");
	show_name_link.setAttribute("href", "#");
	show_name_link.innerHTML = show_info.name;
	show_name_link.onclick = function() {
            draw_set_list(get_set_list(year, show_info));
	};

	var show_name_entry = document.createElement("span");
	show_name_entry.appendChild(show_name_link);
	show_name_entry.setAttribute("class", "entry");

	shows_col.appendChild(show_name_entry);
    });

    frag.appendChild(shows_col);

    var old = document.getElementById("shows");
    old.parentNode.replaceChild(frag, old);
};

var draw_set_list = function(show_info) {
    var frag = document.createDocumentFragment();
    var setlist_col = document.createElement("div");
    setlist_col.setAttribute("class", "box");
    setlist_col.setAttribute("id", "songs");

    show_info.setlist.forEach(function(song) {
        var song_link = document.createElement("a");
        song_link.setAttribute("href", "#");
        song_link.innerHTML = song.title;
        song_link.onclick = function() {
            var player = document.getElementById("audio-tag");
            player.setAttribute("src", song.url);

            player.play();
        };

        var song_entry = document.createElement("span");
        song_entry.appendChild(song_link);
        song_entry.setAttribute("class", "entry");

        setlist_col.appendChild(song_entry);
    });

    frag.appendChild(setlist_col);

    var old = document.getElementById("songs");
    old.parentNode.replaceChild(frag, old);
};

var test = function() {
    var data = get_show_collections();
    var years = existing_years(data);
    draw_years_list(years);
};
