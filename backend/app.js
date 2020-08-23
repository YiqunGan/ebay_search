var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();


var display = require('./routes/users');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api/display',display);

// app.get('/',function(req,res){
//     var curr = req.body;
//     res.(curr);
// });


var url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=YiqunGan-yiqunapp-PRD-7c8ec878c-25856e07&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=100";

app.get('/display', function(req, res){
    for(var item in req.query){
        url += "&"+ item + "=" + req.query[item];
        console.log(url);
    }
    request(url, function(error, response, body){
        if(error){
            console.log("something went wrong");
        }else{
            if(response.statusCode == 200){
                var parseData = JSON.parse(body);
                //var result = filterData(parseData);
            
                res.json(parseData);
            }
        }
    });
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
     console.log(`App listening on port ${PORT}`);
 });

module.exports = app;
