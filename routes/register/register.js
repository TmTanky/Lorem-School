const express = require(`express`)
const createError = require(`http-errors`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcrypt`)
const { body, validationResult } = require('express-validator')

const router = express.Router()

const saltRounds = 10

// User Model 
const User = require(`../../models/usermodel/user`)

router.get(`/register`, (req, res, next) => {

    const kuki = req.session.token

    if (!kuki) {
        res.render(`register`)
    } else {
        res.redirect(`/home`)
    }
    
})

router.post(`/register`, body('password').isLength({ min: 5 }).withMessage(`Password must minimum of 5 characters.`), async (req, res, next) => {

    const {firstName, lastName, email, password, passwordConfirm} = req.body

    let errorBox = []

    try {

        if (!firstName, !lastName, !email, !password, !passwordConfirm) {
            errorBox.push({ msg: `Please input all fields.` })
            return res.render(`register`, {errorBox})
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errorBox.push({ msg: errors.errors[0].msg })
            return res.render(`register`, {errorBox})
        }

        if (password !== passwordConfirm) {
            errorBox.push({ msg: `Password must match.` })
            return res.render(`register`, {errorBox})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newStudent = await new User ({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        const savedStudent = await newStudent.save()
        const token = jwt.sign({activeUser: newStudent._id}, process.env.JWT_KEY)
        const kuki = req.session.token = token

        res.redirect(`/home`)
        
    } catch (err) {

        if (err.code === 11000) {
            errorBox.push({ msg: `Email is already taken.` })
            return res.render(`register`, {errorBox})
        }

        next(createError(400, err))
    }



})

module.exports = router