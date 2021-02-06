const express = require(`express`)
const createError = require(`http-errors`)

const router = express.Router()

router.get(`/home`, (req, res, next) => {
    res.send(`Welcome User`)
})

module.exports = router