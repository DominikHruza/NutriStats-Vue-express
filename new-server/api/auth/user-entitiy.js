const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },   
    
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'meal'
    }],
})

module.exports = User = mongoose.model('user', UserSchema)