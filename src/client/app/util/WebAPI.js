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
    }
};
