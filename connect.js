
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://cosimalagae:NightShops@cluster0.feoj2.mongodb.net/web2courseproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("web2courseproject").collection("nightshops");
  // perform actions on the collection object
  client.close();
});