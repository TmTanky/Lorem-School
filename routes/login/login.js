const express = require(`express`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const router = express.Router()

const User = require(`../../models/usermodel/user`)

router.get(`/login`, (req, res, next) => {

    const kuki = req.session.token 
    
    if (!kuki) {
        res.render(`login`)
    } else {
        res.redirect(`/home`)
    }

})

router.post(`/login`, async (req, res, next) => {

    const {email, password} = req.body

    let errorBox = []

    try {

        const foundAccount = await User.findOne({email})

        if (foundAccount) {
            
            const result = await bcrypt.compare(password, foundAccount.password)

            if (result) {
                const token = jwt.sign({activeUser: foundAccount._id}, process.env.JWT_KEY)
                const kuki = req.session.token = token
                
                res.redirect(`/home`)
            } else {
                errorBox.push({ msg: `Invalid Email or Password.`})
                return res.render(`login`, {errorBox})
            }

        } else {
            errorBox.push({ msg: `User not exist.`})
            return res.render(`login`, {errorBox})
        }
        
    } catch (err) {
        errorBox.push({ msg: `User not exist.`})
        return res.render(`login`, {errorBox})
    }

})

module.exports = router