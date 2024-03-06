const express = require('express')
const ejs = require('ejs')
const rateLimit = require('express-rate-limit')
const DynamicRouter = require('./dynamic/dynamic.router')
const UrlRouter = require('./shortUrl/url.router')

const app = express()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 1 min
    limit: 100,
    standardHeaders: 'draft-7'
})

//  Apply the rate limiting middleware to all request
app.use(limiter)

app.set("view engine", "ejs")
app.use(express.static('public'))

app.use(express.json()); //body parser
app.use(express.urlencoded({ extended: true })); // body parser: formdata


app.use("/Home", (req, res) => {
  res.status(200).render("Home", {});
});

app.use('/', DynamicRouter)
app.use('/api', UrlRouter)

module.exports = app