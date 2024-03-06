const express = require('express')
const controller = require('./url.controller')
const middleware = require('./url.middleware')
const cacheMiddleWare = require('../middleware/cache.middleware')

const router = express.Router()

router.post("/urlShortener", middleware.validateurlJoi, cacheMiddleWare.cacheMiddleWare ,controller.CreateShortUrl);

module.exports = router

// middleware.validateUrl,