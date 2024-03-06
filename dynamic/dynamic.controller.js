const UrlModel = require('../model/url.model')
const qrcode = require('qrcode')


const ClickCount = async (req, res) => {
    try {
        const url = await UrlModel.findOne({ID: req.params.urlid})
        console.log(req.params)
        if (url) {
            await UrlModel.updateOne(
             {
                  ID: req.params.urlid
             },
             {
                $inc: {ClickCount: 1}
             }
            )
            return res.redirect(302, url.OriginalUrl)
        } else{
            res.status(404).json({
                message: "Not Found"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server not found",
            data: null
        })
    }
}

const QrCode = async (req, res) => {
    const {ShortlUrl, OriginalUrl} = req.body

    let opts = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 0.3,
      margin: 1.2,
      color: {
        dark: "#EC9316",
        light: "#FFFF",
      },
      width: 250,
    };

    if(ShortlUrl) {
        qrcode.toDataURL(ShortlUrl, opts, (err, src) => {
            res.render("QRGen", {
                OriginalUrl: OriginalUrl,
                ShortUrl: ShortlUrl,
                qr_code: src
            })
        })
    } else {
        res.status(400).json({
             message:"Short Url not found"
            })
    }
}

const UpdateUrl = async (req, res) => {
    const { ShortlUrl, OriginalUrl} = req.body
    try {
        const url = await UrlModel.findOne({ ShortUrl: ShortlUrl})
        if (url) {
            await UrlModel.updateOne({
                OriginalUrl: OriginalUrl
            })
            return res.render("QRGen", {
                OriginalUrl: OriginalUrl,
                ShortlUrl: ShortlUrl,
                qr_code: ""
            })
        } else {
            res.status(400).json({
                message: "Not found"
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports = {
    ClickCount,
    QrCode,
    UpdateUrl,
}