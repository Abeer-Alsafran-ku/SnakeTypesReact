const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    monthlyStats: [
        {
            month: {
                type: String,
            },
            score: {
                type: Number,
            }
        }
    ]
}, { versionKey: false })

const Users = mongoose.model("Users", UsersSchema);

module.exports = { Users };