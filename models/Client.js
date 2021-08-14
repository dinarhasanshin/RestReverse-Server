const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    history: [{
        restaurant: {type: String, required: true},
        table: {type: String, required: true},
        time: {type: Date, required: true}
    }]
})

module.exports = model('Client', schema)