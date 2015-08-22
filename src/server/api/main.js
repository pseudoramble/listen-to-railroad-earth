var express = require('express');
var app = express();

app.get('/shows/:year', function(req, res) {

});

app.get('/setlist/:show', function(req, res) {

});

app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
