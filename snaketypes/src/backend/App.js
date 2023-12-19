require("dotenv").config()
var express = require('express');
var mongoose = require('mongoose');
const { fetchObj } = require('./utils');
var app = express();

const {Stats} = require('./models/Stats');


app.use(express.json())


// get all stats
app.get('/stats', async (req, res) => {
   
    let uid = req.body.uid;
    let stats = null;

    // if uid is not provided retrieve all stats
    if(!uid){
        stats = await Stats.find();
    }
    else{
        // find stats where user.uid = uid and send it
        stats = await Stats.findOne({uid: uid});
        console.log('stats: ', stats)                  
        if(!stats){
            res.status(404).json({error: 'User Not Found'});
            return;
        }
    }

    res.send(stats);
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
        gamesPlayed: req.body.gamesPlayed,
        wordsCompleted: req.body.wordsCompleted,
        highScore: req.body.highScore,
    }

    // check if user exists, should check from users collection
    // const userExists = Stats.findOne({uid: req.body.uid});
    const userExists = true;

    if(!userExists){
        res.send({error: "User does not exist"})
    }
    else{
        await (new Stats(newStats)).save();
        res.send({message: "Object added successfully"}) 
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
app.patch('/stats', async (req, res) => {
    console.log('attempting to update: ', req.body)

    if(!req.body.uid || !req.body.field || !req.body.value ){
        res.send({error: "Not all requested fields are fullfiled"});
        return;
    }


    const stat = await Stats.findOne({uid: req.body.uid});
    
    // if user not found
    if(stat){
        // for now just increment the field value, later should use switch statement to identify how to modify each field
        stat[req.body.field] += req.body.value;
        stat.save()

        res.send({message: `Field updated successfully`})    
    }
    else{
        res.send({error: "User does not exist"})
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