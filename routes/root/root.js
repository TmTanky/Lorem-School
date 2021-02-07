const express = require(`express`)

const router = express.Router()

router.get(`/`, (req, res, next) => {
    
    const kuki = req.session.token  
    
    if (!kuki) {
        res.render(`login`, {kuki})
    } else {
        res.redirect(`/home`)
    }

})

module.exports = router