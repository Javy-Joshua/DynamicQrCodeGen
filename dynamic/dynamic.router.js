const express = require("express")
const controller = require('./dynamic.controller')

const router = express.Router()

router.get("/nav/:urlid", controller.ClickCount)

router.post("/QRCode", controller.QrCode)

router.post("/update", controller.UpdateUrl)

router.get("/QRGen", (req, res) => {
  res.status(200).render("QRGen", {
    OriginalUrl: "",
    ShortUrl: "",
    qr_code: "",
  });
});

router.get("/", (req, res) => {
  // res.status(200).render("Home",{})
  res.redirect("/Home");
});

module.exports = router