const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    title: {type: String, required: true},
    rate: {type: Number, default: null},
    location: {type: String, required: true},
    tables: [{
        title: {type: String, required: true},
        status: {type: String, required: true},
        other_tag: {type: String, required: false}
    }],
    clients: [{ type: Types.ObjectId, ref: 'Client' }],
})

module.exports = model('Restaurant', schema)