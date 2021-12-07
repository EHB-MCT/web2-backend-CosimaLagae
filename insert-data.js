const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://cosimalagae:NightShops@cluster0.feoj2.mongodb.net/web2courseproject?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "web2courseproject";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("nightshops");

         // Construct a document                                                                                                                                                              
         let nightshopDocument = {
            name:"Night store",
            adress:"Quai aux Barques 1, 1000 Bruxelles",
            samosa:false
            }
         
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(nightshopDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);

