const express = require('express')
const fs = require('fs/promises');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.json());

//Root route
app.get('/', (req, res) => {
    console.log('local root called!');
    res.status(300).res.redirect('/info.html');
})

//return all nightshops from the file
app.get('/nightshops',async(req, res)=>{
    try{
        let data = await fs.readFile('data/nightshops.json');
        res.status(200).send(JSON.parse(data));

    } catch(error){
        res.status(500).send('File could not be read')
    }  
})

//get one nightshop
app.get('/nightshop',async(req, res)=>{
    console.log(req.query.id);
    try{
        let nightshops = await fs.readFile('data/nightshops.json');
        nightshops = JSON.parse(nightshops);

        let ns = nightshops[req.query.id];


        if(ns){
            res.status(200).send(ns);
            return;
        } else {
            res.status(400).send('nightshop could not be found');
        }
    } catch(error){
        console.log(error);;
        res.status(500).send('File could not be read')
    } 
})

//save a nightshop POST
app.post('/saveNightshop', async (req, res)=>{
    if(!req.body.id || !req.body.name || !req.body.adress || !req.body.samosa){
        res.status(400).send('bad request missing id, name, adress or samosa')
        return;
    } 
    try{
        let nightshops = await fs.readFile('data/nightshops.json');
        nightshops = JSON.parse(nightshops);
    
        nightshops[req.body.id] = {
            name: req.body.name,
            adress: req.body.adress,
            samosa: req.body.samosa
        }
        
        await fs.writeFile('data/nightshops.json',JSON.stringify(nightshops));
        res.status(201).send(`nightshop succesfully saved with id ${req.body.id}`);
        return;

    } catch(error){
        res.status(500).send('an error has occured!')
    }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`)
})