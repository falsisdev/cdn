const express = require("express");
const app = new express();
const path = require("path");
const anime = require(path.join(process.cwd(), "/anime/index.js"))
const animeParams = ["images", "info"]
const params = ["anime"]
app.listen(3000, (req, res) => {
    console.log("Tüm cdn Proje Başlatıldı.")
})
app.get("/", function(req, res) {
    res.json({
        code: 200,
        response: "CDN is working"
    })
})
app.get('/anime/:type', (req, res) => {
    if(animeParams.includes(req.params.type) == false) {
        res.json({
            code: 404,
            response: "Page not Found"
        })
    }
    switch(req.params.type) {
    case "images":
    anime.images(req, res)
    break;
    case "info":
    anime.info(req, res)
    break;
    }
})