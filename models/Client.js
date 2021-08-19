const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    numberPhone: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    history: [{
        restaurant: {type: String, required: true},
        table: {type: String, required: true},
        time: {type: Date, required: true}
    }]
})

module.exports = model('Client', schema)