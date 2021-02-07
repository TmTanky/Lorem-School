const express = require(`express`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const router = express.Router()

const User = require(`../../models/usermodel/user`)

router.get(`/home`, async (req, res, next) => {

    const kuki = req.session.token

    try {

        if (!kuki) {
            res.redirect(`/login`)
        } else {
            const decoded = jwt.verify(kuki, process.env.JWT_KEY)
            const foundUser = await User.findOne({_id: decoded.activeUser})

            res.render(`home`, {user: foundUser.firstName})
        }
        
    } catch (err) {

        if (err.name === "TokenExpiredError") {
            return next(createError(500, `Token expired, Try to login again.`))
        }

        next(createError(400, err))
    }

})

module.exports = router