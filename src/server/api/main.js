var express = require('express');
var app = express();

app.use(express.static('../../client/public'));

app.get('/shows/:year', function(req, res) {
    console.info("/show/" + req.params.year + " called");
    
    res.json([{ id : "abcde12345", date : "2001-09-20", venue : "The Ranch", location : "Somewhere, TX"}]);
});

app.get('/setlist/:show', function(req, res) {
    console.info("/setlist/" + req.params.show + " called");
    
    res.json([{
        id : "abcde12345",
        title : "Hobo Song",
        url : "https://archive.org/download/rre2007-06-22.adkA51TL.flac/rre2007-06-22d02t07.mp3"
    }, {
        id : "lolwut987",
        title : "Drag Him Down",
        url : "https://archive.org/download/rre2007-06-22.adkA51TL.flac/rre2007-06-22d01t01.mp3"
    }]);
});

app.listen(3000, function() {
    console.warn("Started");
});
