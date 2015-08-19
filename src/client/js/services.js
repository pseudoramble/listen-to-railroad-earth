define(["xhrer"], function(xhrer) {
    return {
        getYears : function(callback) {
            xhrer.get("http://localhost/data/years", callback);
        },

        getShows : function(year, callback) {
            xhrer.get("http://localhost/data/shows/" + year, callback);
        },

        getSetList : function(id, callback) {
            xhrer.get("http://localhost/data/setlist/" + id, callback);
        }
    };
});
