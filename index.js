var express = require('express');
var async = require('async');
var http = require('http');
var bodyParser = require ("body-parser");

var app = express();

try {
    app.set('port', process.env.PORT || 8080);
} catch (ex) {
    console.log("Whoops, unable to set the port. Additional information: ");
    console.log(ex);
}
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log("====================================");
    console.log("Received request - Printing Headers");
    console.log("====================================");
    console.log(req.headers)
    console.log("====================================");
    console.log("HEADERS DONE - PRINTING Body");
    console.log("====================================");
   // console.log(req.body);
    try{
    console.log(JSON.stringify(res.query, null, 4));
} catch (ex){
console.log("UNABLE TO STRINGIFY QUERY");
}
    //console.log(req);	

    res.send("This is successful!");
});

app.get('/',function(req, res){
  console.log("====================================");
  console.log("Received GET - Printing Headers");
  console.log("====================================");
  console.log(req.headers)
  console.log("====================================");
  console.log("HEADERS DONE - PRINTING Body");
  console.log("====================================");
  console.log(req.body);
  //console.log(req);
        try{     console.log(JSON.stringify(res.query, null, 4)); } catch (ex){ console.log("UNABLE TO STRINGIFY QUERY"); }
  res.send("This is successful!");

});


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
