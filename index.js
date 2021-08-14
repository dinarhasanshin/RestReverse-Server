const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/restaurants', require('./routes/restaurant.routes'))

async function start(){

    try {
        await mongoose.connect(
            'mongodb+srv://Huntmen:X48V35B73@cluster0.lt0h9.mongodb.net/AllRestaurantsDB?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on PORT ${PORT}`)
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }

}

start()

