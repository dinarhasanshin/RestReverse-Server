const { Router } = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const Restaurant = require('../models/Restaurant')
const Client = require('../models/Client')

const router = Router()


//CLIENT

// /api/auth
router.post(
    '/client/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){

            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid email or password'
            })
        }

        const {email, password} = req.body

        const candidate = await Client.findOne({ email })

        if (candidate){
            return res.status(400).json({ message: 'This user is current' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const client = new Client({ email, password: hashedPassword })

        await client.save()

        res.status(201).json({ message: 'User is created' })

    }catch (e) {
        res.status(500).json(e.message)
    }
})

// /api/auth
router.post(
    '/client/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password').isLength({ min: 6 })
            .exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid email or password'

                })
            }

            const {email, password} = req.body

            const client = await Client.findOne({ email })

            if (!client){
                return res.status(400).json({ message: 'Invalid email or password E' })
            }

            const isMatch = await bcrypt.compare(password, client.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Invalid email or password P' })
            }

            const token = jwt.sign(
                { userId: client.id },
                "WeatherVeryWell",
                { expiresIn: '1d' }
            )

            res.json({ token, userId: client.id })

        }catch (e) {
            res.status(500).json({message: 'Error, try again'})
        }
})

//CLIENT WITHOUT AUTH

//RESTAURANT

// /api/auth
router.post(
    '/restaurant/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){

                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid email or password'
                })
            }

            const {email, password} = req.body

            const candidate = await Restaurant.findOne({ email })

            if (candidate){
                return res.status(400).json({ message: 'This user is current' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new Restaurant({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User is created' })

        }catch (e) {
            res.status(500).json(e.message)
        }
    })

// /api/auth
router.post(
    '/restaurant/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password').isLength({ min: 6 })
            .exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)



            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid email or password'

                })
            }

            const {email, password} = req.body

            const restaurant = await Restaurant.findOne({ email })

            if (!restaurant){
                return res.status(400).json({ message: 'Invalid email or password E' })
            }

            const isMatch = await bcrypt.compare(password, restaurant.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Invalid email or password P' })
            }

            const token = jwt.sign(
                { userId: restaurant.id },
                "WeatherVeryWell",
                { expiresIn: '1d' }
            )

            res.json({ token, userId: restaurant.id })

        }catch (e) {
            res.status(500).json({message: 'Error, try again'})
        }
    })

// /api/auth
router.get(
    '/users',
    async (req, res) => {

    try {
        res.status(201).json({ message: 'Work' })

    }catch (e) {
        res.status(500).json({message: 'Error, try again'})
    }

})

module.exports = router