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

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

// Routers render

app.use(rootRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(homeRouter)

app.use(logoutRouter)

app.use((req, res, next) => {
    next(createError(404, `URL not found`))
})

app.use((err, req, res, next) => {
    res.status = 500 || err.status
    res.json({
        status: res.status,
        error: err.message,
        err
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running.`)
})