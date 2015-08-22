export default {
    getItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
                    return {
                        id: i,
                        label: item
                    };
                }));
            }, 500);
        });
    },
    
    getShows(year) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([{ id : "abcde12345", date : "2001-09-20", venue : "The Ranch", location : "Somewhere, TX"}]);
            }, 500);
        });
    },

    getSetlist(show) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id : "abcde12345",
                        title : "Hobo Song",
                        url : "https://archive.org/download/rre2007-06-22.adkA51TL.flac/rre2007-06-22d02t07.mp3"
                    }, {
                        id : "lolwut987",
                        title : "Drag Him Down",
                        url : "https://archive.org/download/rre2007-06-22.adkA51TL.flac/rre2007-06-22d01t01.mp3"
                    }]);
            }, 500);
        });
    }
};
