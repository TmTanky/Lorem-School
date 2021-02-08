const express = require(`express`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const router = express.Router()

const User = require(`../../models/usermodel/user`)
const Subject = require(`../../models/subjectsmodel/subject`)

router.get(`/addsubjects`, async (req, res, next) => {

    const kuki = req.session.token

    try {

        if (!kuki) {
            res.redirect(`/login`)
        } else {
            const decoded = jwt.verify(kuki, process.env.JWT_KEY)
            const foundUser = await User.findOne({_id: decoded.activeUser})

            const subs = await Subject.find({})

            res.render(`addsubs`, {subs})
        }
        
    } catch (err) {

        if (err.name === "TokenExpiredError") {
            return next(createError(500, `Token expired, Try to login again.`))
        }

        next(createError(400, err))
    }

})

router.post(`/addsubjects`, async (req, res, next) => {

    const ifChecked = req.body[`subject`]

    console.log(checkedSubject)

    
    

})

module.exports = router