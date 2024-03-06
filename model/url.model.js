const mongoose = require('mongoose')
const uuid = require('uuid')

const Schema = mongoose.Schema

const UrlSchema = new Schema({
    ID: {
        type: String,
        default: uuid.v4()
    },
    OriginalUrl: {
        type: String,
        required: true
    },
    ShortUrl: {
        type: String,
        required: true
    },
    ClickCount: {
        type: Number,
        require: true,
        default: 0
    },
    date: {
        type: String,
        default: Date.now()
    }
})

const UrlModel = mongoose.model('Urls', UrlSchema)

module.exports = UrlModel