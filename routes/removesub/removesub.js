const express = require(`express`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)

const router = express.Router()

const User = require(`../../models/usermodel/user`)
const Subject = require(`../../models/subjectsmodel/subject`)

router.get(`/removesubjects`, async (req, res, next) => {

    const kuki = req.session.token

    try {

        if (!kuki) {
            res.redirect(`/login`)
        } else {
            const decoded = jwt.verify(kuki, process.env.JWT_KEY)
            const foundUser = await User.findOne({_id: decoded.activeUser})

            const subjectName = foundUser.subjects

            res.render(`removesub`, {subjectName})

        }
        
    } catch (err) {

        if (err.name === "TokenExpiredError") {
            return next(createError(500, `Token expired, Try to login again.`))
        }

        next(createError(400, err))
    }

})

router.post(`/removesubjects`, async (req, res, next) => {
    
    const querySubject = req.body.removesub
    const kuki = req.session.token

    try {

        const decoded = jwt.verify(kuki, process.env.JWT_KEY)
        // const foundUser = await User.findOne({_id: decoded.activeUser})

        const hehe = await User.findOneAndUpdate({_id: decoded.activeUser}, {
            $pull: {
                subjects: querySubject
            }
         })

        res.redirect(`/removesubjects`)

        
    } catch (err) {
        next(createError(400, err))
    }
    

})

module.exports = router