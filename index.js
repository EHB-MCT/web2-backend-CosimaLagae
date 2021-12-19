const express = require('express')
const fs = require('fs/promises');
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');
require('dotenv').config();

console.log(process.env.TEST);;

const client = new MongoClient(process.env.FINAL_URL);

const app = express()
const port = process.env.PORT

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('local root called!');
    res.status(300).redirect('/info.html');
})

app.get('/nightshops',async(req, res)=>{
    try{
        await client.connect();

        const colli = client.db("web2courseproject").collection("nightshops");
        const nss = await colli.find({}).toArray();

        res.status(200).send(nss);
    } catch(error){
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    }  finally {
        await client.close();
    }
})

app.get('/nightshop',async(req, res)=>{
    try{
        await client.connect();
        const colli = client.db("web2courseproject").collection("nightshops");

        const query = {nsid: Number(req.query.id)};
        console.log(query);

        const ns = await colli.findOne(query);;

        if(ns){
            res.status(200).send(ns);
            return;
        } else {
            res.status(400).send('nightshop could not be found');
        }
    } catch(error){
        console.log(error);;
        res.status(500).send({
            error: 'File could not be read',
            value: error
        });
    } finally {
        await client.close();
    }
})

app.post('/saveNightshop', async (req, res)=>{
    if(!req.body.nsid || !req.body.name || !req.body.adress || !req.body.samosa){
        res.status(400).send('bad request missing id, name, adress or samosa')
        return;
    } 
    try{
        await client.connect();
        const colli = client.db("web2courseproject").collection("nightshops");

        const ns = await colli.findOne({nsid: req.body.nsid});
        if(ns){
            res.status(400).send('Bad request: nightshop already exists with id '+ req.body.nsid);
            return;
        }    

        let newNightshop = {
            nsid: req.body.nsid,
            name: req.body.name,
            adress: req.body.adress,
            samosa: req.body.samosa
        }

        let insertResult = await colli.insertOne(newNightshop);

        res.status(201).send(`nightshop succesfully saved with nsid ${req.body.nsid}`);
        return;

    } catch(error){
        console.log(error);;
        res.status(500).send({
            error: 'An error has occured!',
            value: error
        });
    }finally {
        await client.close();
    }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`)
})