
let mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    avgScore: {
        type: Number,
    },
    gamesPlayed: {
        type: Number
    },
    wordsCompleted: {
        type: Number
    },
    highScore: {
        type: Number
    }
})

const Stats = mongoose.model("Stats", StatsSchema);

module.exports = { Stats };