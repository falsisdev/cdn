const express = require("express");
const app = new express();
const path = require("path");
const anime = require(path.join(process.cwd(), "/anime/index.js"))
app.listen(3000, () => {
    console.log("Tüm cdn Proje Başlatıldı.")
})
app.get("/", function(req, res) {
    res.json({
        response: "ok."
    })
})
app.get('/anime/:type', (req, res) => {
    switch(req.params.type) {
    case "images":
    anime.images(req, res)
    break;
    }
})