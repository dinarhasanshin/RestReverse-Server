const { Router } = require('express')
const Restaurant = require('../models/Restaurant')
const auth = require('../middleware/auth.middleware')
const Order = require('../models/Order')
const { check } = require('express-validator')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {

        const { location } = req.body

        const restaurants = await Restaurant.find({ location }, { title: 1, rate: 1 })
        return res.json(restaurants)

    }catch (e) {
        return res.status(500).json({ message: 'Some Error' })
    }

})

router.get('/:id', auth, async (req, res) => {
    try {

        const restaurant = await Restaurant.findById(req.params.id, { email: 0, password: 0 })
        return res.status(200).json(restaurant)

    }catch (e) {
        return res.status(500).json( { message: 'Some Error' })
    }
})

router.post('/reserve', [
    check('firstName').exists(),
    check('lastName').exists(),
    check('time').exists(),
    check('tableIndex').exists(),
], auth, async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()){

            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid order data'
            })
        }

        const { firstName, lastName, time, tableIndex } = req.body

        const order = new Order({ firstName, lastName, time, tableIndex })

        await order.save()

        return res.status(200).json( { message: 'Order is created'})

    }catch (e) {
        return res.status(500).json( { message: 'Some Error' })
    }
})

module.exports = router