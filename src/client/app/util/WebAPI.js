const callService = function(path, method, data) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method || "GET", path);
        request.setRequestHeader("Content-Type", "application/json");
        
        if (data)
            request.send(data);
        else
            request.send();
        
        request.addEventListener("load", (evt) => resolve(JSON.parse(request.responseText)));
        request.addEventListener("error", (evt) => reject("Something bad happened"));
    });
};

export default {
    getShows(year) {
        return callService("/shows/" + year);
    },

    getSetlist(show) {
        return callService("setlist/" + show);
    }
};
