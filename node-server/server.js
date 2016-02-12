var express = require('express');
var Parser = require('dbf-parser');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/dbf/:name', function (req, res) {
  dbfJSON = {records: []}
  parser = new Parser(__dirname + '/dbf/' + req.params.name);
  parser.on('header', function (h) {
    dbfJSON.header = h;
  })
  parser.on('record', function (r) {
    delete r['@sequenceNumber'];
    delete r['@deleted'];
    dbfJSON.records.push(r);
  })
  parser.on('end', function () {
    res.json(dbfJSON);
  })
  parser.parse();
  
})

app.listen(3000, function () {
  console.log("Listening on 3000...")
})
