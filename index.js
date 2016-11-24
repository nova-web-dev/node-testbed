var express = require('express');
var async = require('async');
var http = require('http');
var bodyParser = require("body-parser");

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

app.post("/*", function(req, res) {
    console.log("====================================");
    console.log("Received POST - Printing Headers\n");
    console.log(req.headers);
    console.log("\nHEADERS DONE - PRINTING Body\n");
    try {
        console.log("Printing strinified JSON:");
        console.log(JSON.stringify(req.body, null, 4));
    } catch (ex) {
        console.log("UNABLE TO STRINGIFY BODY\n");
    }

    try{
      console.log("\nPrinting normal body:\n");
      console.log(req.body);
    } catch (ex){
      console.log("UNABLE TO PRINT BODY");
    }
    console.log("====================================");
    // console.log("PRINTING FULL REQUEST");
    // console.log(req);

    console.log("\nPrinting params...\n");
    console.log(req.params);
    res.send("This is successful!");
});

app.get('/*', function(req, res) {
    console.log("====================================");
    console.log("Received GET - Printing Headers\n");
    console.log(req.headers);
    console.log("\nHEADERS DONE - PRINTING Body\n");
    console.log(req.body);
    console.log("====================================");
    //console.log(req);
    try {
        console.log(JSON.stringify(res.query, null, 4));
    } catch (ex) {
        console.log("UNABLE TO STRINGIFY QUERY");
    }
    console.log("\nPrinting params...\n");
    console.log(req.params);
    res.send("This is successful!");

});



http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});






//inbound_message



function handleWebhook(params, res) {
    if (!params['status'] || !params['messageId']) {
        console.log('This is not a delivery receipt');
    } else {
        //This is a DLR, check that your message has been delivered correctly
        if (params['status'] !== 'delivered') {
            console.log("Fail:", params['status'], ": ", params['err-code']);
        } else {
            console.log("Success");
          /*
            * The following parameters in the delivery receipt should match the ones
            * in your request:
            * Request - from, dlr - to\n
            * Response - message-id, dlr - messageId
            * Request - to, Responese - to, dlr - msisdn
            * Request - client-ref, dlr - client-ref
           */
        }
    }
    res.sendStatus(200);
}
