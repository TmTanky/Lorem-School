const express = require(`express`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const router = express.Router()

const User = require(`../../models/usermodel/user`)

router.get(`/login`, (req, res, next) => {

    res.render(`login`)

})

router.post(`/login`, async (req, res, next) => {

    const {email, password} = req.body

    try {

        const foundAccount = await User.findOne({email})

        if (foundAccount) {
            
            const result = await bcrypt.compare(password, foundAccount.password)

            if (result) {
                const token = await jwt.sign({activeUser: foundAccount._id}, process.env.JWT_KEY)
                req.session.token = token
                console.log(req.session.token)
                res.redirect(`/home`)
            } else {
                console.log(`Ekis`)
            }

        } else {
            return next(createError(400, err))
        }
        
    } catch (err) {
        next(createError(400, `User not exist.`))
    }

})

module.exports = router