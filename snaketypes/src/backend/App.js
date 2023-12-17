
var express = require('express');
const { fetchObj } = require('./utils');
var app = express();


// get all stats
app.get('/stats', async (req, res) => {
    let stats = await fetchObj('stats').catch((error)=>res.json(error))
    res.send(stats);
})

// get specific stats
app.get('/stats/:uid', async (req, res) =>{
    let uid = req.params.uid;
    let stats = await fetchObj(`stats`).catch((error)=>res.send(error))     // get all stats

    const userStats = stats.find(stat => stat.uid == uid);                  // find stats where user.uid = uid
    if(userStats){
        res.send(userStats)
    }

    res.status(404).json({message: 'User Not Found'});
})

app.listen(5001, () => {
    console.log('listening on port 5001 :D');
})