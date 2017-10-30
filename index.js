var express = require('express')
var app = express()
var fs = require('fs');

var objectJSON = {
  status: true,
  id : 5,
  name: "Matthias",
  surname : "Blanquer",
  email : "matthias.blanquer@axa.fr"
}

app.get('/', function (req, res){
  res.json("Je suis une page index")
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/backend_simple_rest', function (req, res) {
  objectJSON.id = Math.floor((Math.random() * 10) + 1);
  setTimeout(sendDelayedResponse.bind(null, res, objectJSON), 100);
});

app.get('/backend_simple_soap', function (req, res) {
  objectJSON.id = Math.floor((Math.random() * 10) + 1);

  fs.readFile('xml_sample.xml', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    setTimeout(sendDelayedResponseXML.bind(null, res, data), 100);
  });
});

function sendDelayedResponseXML(res, xml){
  res.status(200) ;
  res.send(xml);
}

function sendDelayedResponse(res, json){
  res.status(200) ;
  res.json(json);
}

app.listen(process.env.PORT || 1337, function () {
  console.log('Example app listening on port 80!');
})
