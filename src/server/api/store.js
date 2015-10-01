var fs = require('fs');

const SHOW_INFO_PATH = "../collection/show-data/";

const YEAR_TO_SHOWS = {};
(function(dir, showData) {
    fs.readdir(dir, function(dirErr, files) {
        if (!dirErr) {
            files.forEach(function(file) {
                fs.readFile(dir + file, 'utf-8', function(fileErr, data) {
                    if (!fileErr) {
                        const parsedData = JSON.parse(data);
                        const showYear = new Date(parsedData.date).getFullYear();
                        
                        if (showData[showYear]) {
                            showData[showYear].push(parsedData);
                        } else {
                            showData[showYear] = [parsedData];
                        }
                    } else {
                        console.error("ERROR - Unable to read the file " + file + " from this directory during year-to-shows");
                        console.error(fileErr);
                    }
                });
            });
        } else {
            console.error("ERROR - unable to read the show-data directory");
        }
    });
})(SHOW_INFO_PATH, YEAR_TO_SHOWS);

const SHOW_TO_SETLIST = {};
(function(dir, showData) {
    fs.readdir(dir, function(dirErr, files) {
        if (!dirErr) {
            files.forEach(function(file) {
                fs.readFile(dir + file, 'utf-8', function(fileErr, data) {
                    if (!fileErr) {
                        const parsedData = JSON.parse(data);
                        const showId = parsedData.id;
                        const setlist = parsedData.setlist.length === 1 && parsedData.setlist[0].length > 0 ? parsedData.setlist[0] : parsedData.setlist;
                        
                        showData[showId] = setlist;
                    } else {
                        console.error("ERROR - Unable to read the file " + file + " from this directory during show-to-setlist");
                        console.error(fileErr);
                    }
                });
            });
        } else {
            console.error("ERROR - unable to read the show-data directory");
        }
    });
})(SHOW_INFO_PATH, SHOW_TO_SETLIST);

module.exports = {
    getShows : function(year) {
        return YEAR_TO_SHOWS[year].sort(function(a, b) {
            return a.date < b.date ? -1 : 1;
        }) || [];
    },

    getSetlist : function(showId) {
        return SHOW_TO_SETLIST[showId] || [];
    }
};
