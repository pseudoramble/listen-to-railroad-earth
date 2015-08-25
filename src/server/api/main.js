var express = require('express'),
    store = require('./store.js');

var app = express();

app.use(express.static('../../client/public'));

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.get('/shows/:year', function(req, res) {
    console.info("/show/" + req.params.year + " called");
    
    const results = store.getShows(req.params.year);
    res.json(results);
});

app.get('/setlist/:show', function(req, res) {
    console.info("/setlist/" + req.params.show + " called");

    const results = store.getSetlist(req.params.show);
    res.json(results);
});

app.listen(3000, function() {
    console.warn("Started");
});
