require("dotenv").config();
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL;

MongoClient.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("refactory");
  dbo.collection("user").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});