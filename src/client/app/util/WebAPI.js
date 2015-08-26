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
        const service = DEBUG ? "http://localhost:3000/shows/" : "/shows/";
        return callService(service + year);
    },

    getSetlist(show) {
        const service = DEBUG ? "http://localhost:3000/setlist/" : "/setlist/";
        return callService(service + show);
    }
};
