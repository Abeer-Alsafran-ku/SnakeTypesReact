require("dotenv").config()
var express = require('express');
var mongoose = require('mongoose');
const { fetchObj } = require('./utils');
var app = express();

const {Stats} = require('./models/Stats');
const {Users} = require('./models/Users');

app.use(express.json())

// later this will be linked into mongo: I left this to make it still functional with requests on Users collection
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
    ],
    "users": [
        {
          "id": 1,
          "username": "John Doe",
          "password": "abc123@",
          "img": "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
        },
        {
          "id": 2,
          "username": "emy",
          "password": "a1@",
          "img": "https://mdbcdn.b-cdn.net/img/new/avatars/4.webp"
        }
      ]
  }

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
        // for now just increment the field value, later should use switch statement to identify how to modify each field
        database.stats[idx][req.body.field] += req.body.value
        res.send({message: "No Objections"})
    }

})

// get all users
app.get('/users', async (req, res) => {
    let users = await Users.find();
    res.send(users);
})

//get specific user
app.get('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let user = await Users.findOne({id: userId});
    if (user) {
        res.send(user);
    } else {
        res.status(404).json({ error: 'User Not Found' });
    }
})

// create user
app.post('/users', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.img) {
        res.send({ error: "Not all requested fields are fulfilled" });
        return;
    }

    const highestIdUser = await Users.findOne().sort({ id: -1 });
    const newUserId = highestIdUser ? highestIdUser.id + 1 : 1;

    let newUser = {
        id: newUserId,
        username: req.body.username,
        password: req.body.password,
        img: req.body.img,
    };

    const userExists = await Users.findOne({username: newUser.username});

    if (userExists) {
        res.send({ error: "User already exists" });
    } else {
        await (new Users(newUser)).save();
        res.send({ message: "User created successfully" });
    }

})

//updating user
app.patch('/users/:id', async(req, res) => {
    if (!req.body.username && !req.body.password && !req.body.img) {
        res.send({error: "Not all requested fields are fullfiled"});
        return;
    }

    const user = await Users.findOne({id: req.params.id});

    // if user is not found
    if (!user) {
        res.send({error: "User does not exist"})
    }

    // update
    if (req.body.username) {
        user.username = req.body.username;
    }

    if (req.body.password) {
        user.password = req.body.password;
    }

    if (req.body.img) {
        user.img = req.body.img;
    }
    user.save();
    res.json({ message: 'User updated successfully'});
});

//delete user
app.delete('/users/:id', async(req, res) => {
    res.send({ message: 'User deleted successfully' });
})


// get all users
app.get('/users', (req, res) => {
    let users = database.users;
    res.send(users);
})

//get specific user
app.get('/users/:id', (req, res) => {
    let userId = req.params.id;
    let user = database.users.find(u => u.id == userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).json({ error: 'User Not Found' });
    }
})

// create user
app.post('/users', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.img) {
        res.send({ error: "Not all requested fields are fulfilled" });
        return;
    }

    let newUser = {
        id: database.users.length + 1,
        username: req.body.username,
        password: req.body.password,
        img: req.body.img,
    };

    const userExists = database.users.find(u => u.username === newUser.username);

    if (userExists) {
        res.send({ error: "User already exists" });
    } else {
        database.users.push(newUser);
        res.send({ message: "User created successfully" });
    }

})

//updating user
app.patch('/users/:id', (req, res) => {
    if (!req.body.username && !req.body.password && !req.body.img) {
        res.send({error: "Not all requested fields are fullfiled"});
        return;
    }

    const userIndex = database.users.findIndex(u => u.id == req.params.id);

    // if user is not found
    if (userIndex === -1) {
        res.send({error: "User does not exist"})
        return;
    }

    // update
    if (req.body.username) {
        database.users[userIndex].username = req.body.username;
    }

    if (req.body.password) {
        database.users[userIndex].password = req.body.password;
    }

    if (req.body.img) {
        database.users[userIndex].img = req.body.img;
    }

    res.json({ message: 'User updated successfully'});
});

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