const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tableIndex: { type: String, required: true },
    time: { type: Date, required: true }
})

module.exports = model('Order', schema)