require('dotenv').config()

const express = require(`express`)
const bodyParser = require(`body-parser`)
const cookieSession = require(`cookie-session`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)

const app = express()

// Routes

const rootRouter = require(`./routes/root/root`)
const registerRouter = require(`./routes/register/register`)
const loginRouter = require(`./routes/login/login`)
const homeRouter = require(`./routes/home/home`)
const settingsRouter = require(`./routes/settingsOption/settings`)
const editProfileRouter = require(`./routes/editprofile/editprofile`)
const addSubjectRouter = require(`./routes/addsub/addsubs`)
const removeSubjectRouter = require(`./routes/removesub/removesub`)

const logoutRouter = require(`./routes/logout/logout`)

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(`public`))
app.set(`view engine`, `ejs`)
app.set('trust proxy', 1) 
app.use(cookieSession({
    name: 'active-session',
    keys: [process.env.KEY_1, process.env.KEY_2]
  }))

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, 'useFindAndModify': false})

// Routers render

app.use(rootRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(homeRouter)
app.use(settingsRouter)
app.use(editProfileRouter)
app.use(addSubjectRouter)
app.use(removeSubjectRouter)

app.use(logoutRouter)

app.use((req, res, next) => {
    next(createError(404, `URL not found`))
})

app.use((err, req, res, next) => {
    return res.render(`error`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running.`)
})