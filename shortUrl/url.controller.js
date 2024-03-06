const UrlModel = require('../model/url.model')
const uuid = require('uuid')
const Cache = require('../helpers/cache.helper')



require("dotenv").config();

const CreateShortUrl = async (req, res) => {
    const {OriginalUrl} = req.body
    console.log(OriginalUrl)
    const base = process.env.BASE
    const ID = uuid.v4()
    console.log(`url Id is ${ID}`)
    
    if(OriginalUrl) {
        try {

            const cacheKey = `Urls-${OriginalUrl}`
            console.log(`cacheKey is ${cacheKey}`)

            let url = await UrlModel.findOne({OriginalUrl})
            // console.log(url)
            if(url) {
                res.render("QRGen", {
                    OriginalUrl: url.OriginalUrl,
                    ShortUrl: url.ShortUrl,
                    qr_code: "",
                })
            } else{
                const ShortUrl = `${base}/nav/${ID}`
                url = new UrlModel({
                    OriginalUrl,
                    ShortUrl: ShortUrl,
                    ID,
                    date: new Date()
                })
                await url.save()
                res.render("QRGen", {
                    OriginalUrl: url.OriginalUrl,
                    ShortUrl: url.ShortUrl,
                    qr_code: "",
                })
            }

            console.log("cache miss")
            const TTL_1_DAY = 60* 60 * 24
            Cache.set( cacheKey, url, TTL_1_DAY)

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Server error",
                data: null
            })
        }
    } else{
        res.status(400).json({
            message: "Invalid Original Url ",
            data: null
        })
    }

}


module.exports = {
    CreateShortUrl
}
