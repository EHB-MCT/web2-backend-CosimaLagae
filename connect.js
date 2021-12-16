
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://cosimalagae:NightShops@cluster0.feoj2.mongodb.net/web2courseproject?retryWrites=true&w=majority";
const client = new MongoClient(uri);
test();

async function test(){

  try{
    await client.connect();

    console.log("connected")
    const collection = client.db("web2courseproject").collection("nightshops");
    //console.log("connected2")

    // perform actions on the collection object
    let nightshops = await collection.find({}).toArray();
    //console.log("connected3")

    console.log(nightshops)

  }catch(error){
    console.log(error);
  }finally {
    await client.close();
}
}