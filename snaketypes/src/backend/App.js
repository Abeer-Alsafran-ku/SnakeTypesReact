require("dotenv").config()
var express = require('express');
var mongoose = require('mongoose');
const { fetchObj } = require('./utils');
var app = express();

const {Stats} = require('./models/Stats');


app.use(express.json())

// later this will be linked into mongo
let database = {
    "stats": [
      {
        "uid": 1,
        "avgScore": 3.9,
        "gamesPlayed": 7,
        "wordsCompleted": 301,
        "highScore": 5.7
      },
      {
        "uid": 2,
        "avgScore": 4.2,
        "gamesPlayed": 5,
        "wordsCompleted": 250,
        "highScore": 6.2
      },
      {
        "uid": 3,
        "avgScore": 4.5,
        "gamesPlayed": 9,
        "wordsCompleted": 400,
        "highScore": 7.1
      },
      {
        "uid": 4,
        "avgScore": 3.7,
        "gamesPlayed": 3,
        "wordsCompleted": 150,
        "highScore": 4.9
      }
    ]
  }


// get all stats
app.get('/stats', async (req, res) => {
   /* let stats = await fetchObj('stats').catch((error)=>{
        res.json({ServerError: error})
        return;
    })
    */

    let stats = await Stats.find();
    res.send(stats);
})

// get specific stats
app.get('/stats/:uid', async (req, res) =>{
    let uid = req.params.uid;
    // let stats = await fetchObj(`stats`).catch((error)=>res.send({ServerError: error}))     // get all stats
  

    const userStats = Stats.findById(uid);                  // find stats where user.uid = uid
    if(userStats){
        res.send(userStats)
        return
    }
    res.status(404).json({error: 'User Not Found'});

})

app.post('/stats', async (req, res) => {

    if(!req.body.uid || !req.body.avgScore || !req.body.gamesPlayed || !req.body.wordsCompleted || !req.body.highScore){
        res.send({error: "Not all requested fields are fullfiled"});
        return;
    }

    // making a variable ignores any extra data sent by the request
    let newStats = {
        uid: req.body.uid,
        avgScore: req.body.avgScore,
        gamePlayed: req.body.gamesPlayed,
        wordsCompleted: req.body.wordsCompleted,
        highScore: req.body.highScore,
    }

    // check if user exists
    // const ObjectExists = database.stats.find(object => object.uid === newStats.uid);

    if(ObjectExists && false){
        res.send({error: "Object already exists"})
    }
    else{
        await (new Stats(newStats)).save();
        res.send({message: "No Objections"}) 
    }
    
    /**
     * When mongo is used uncomment this section and modify accordingly
    let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStats)
    }
    await fetchObj('stats', options = options)
    .then(()=>{
        res.send('No objections');
    })
    .catch((error)=>{
        res.send(error);
        return;
    })
    */
})


// updating
app.patch('/stats', (req, res) => {
    console.log('attempting to update: ', req.body)

    if(!req.body.uid || !req.body.field || !req.body.value ){
        res.send({error: "Not all requested fields are fullfiled"});
        return;
    }


    const idx = database.stats.findIndex(object => object.uid === req.body.uid);
    
    // if user not found
    if(idx == -1){
        res.send({error: "User does not exist"})    
    }
    else{
        // for now just increment the field value, later should use switch statement to identify how to modify each field
        database.stats[idx][req.body.field] += req.body.value
        res.send({message: "No Objections"})
    }

})

// handling other paths
app.all('*', (req, res) => {
    res.send({error: "The requested operation does not exist or isn't implemented yet, contact Abdulwahab if there is a problem"})
})

app.listen(5001, async () => {
    let mongoURL = process.env.MONGO_URL;

    try{
        console.log('attempting mongo connection on: ', mongoURL)
        await mongoose.connect(mongoURL)
        console.log('connected to mongo :D')
    }
    catch(error){
        console.log('mongo connection error: ', error)
    }
    console.log('listening on port 5001 :D');
})