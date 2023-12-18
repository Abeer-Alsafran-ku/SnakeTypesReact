
var express = require('express');
const { fetchObj } = require('./utils');
var app = express();

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
    
    let stats = database.stats;
    res.send(stats);
})

// get specific stats
app.get('/stats/:uid', async (req, res) =>{
    let uid = req.params.uid;
    // let stats = await fetchObj(`stats`).catch((error)=>res.send({ServerError: error}))     // get all stats
    let stats = database.stats;

    const userStats = stats.find(stat => stat.uid == uid);                  // find stats where user.uid = uid
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

    const ObjectExists = database.stats.find(object => object.uid === newStats.uid);

    if(ObjectExists){
        res.send({error: "Object already exists"})
    }
    else{
        database.stats.push(newStats);
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
        console.log(database.stats[idx][req.body.field])
        database.stats[idx][req.body.field] += req.body.value
        res.send({message: "No Objections"})
    }

})

// handling other paths

app.listen(5001, () => {
    console.log('listening on port 5001 :D');
})