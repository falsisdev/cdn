const YAML = require("yaml");
const fs = require('fs');
const path = require("path");
const serialmovies = ['codegeassboukokunoakito'];
const synonyms = YAML.parse(fs.readFileSync(path.join(process.cwd(), "/anime/images/synonyms.yaml"), "utf-8"))
module.exports = {    
  images: async function(req, res) {
    let name;
    try {
    name = Object.keys(synonyms).includes(req.query.name) ? req.query.name : Object.keys(synonyms)[Number(Object.values(synonyms).indexOf(Object.values(synonyms).find(array => array.includes(req.query.name))))]
    }catch(err){
    name = null
    }
    var imgdb = fs.readFileSync(path.join(process.cwd(), "/anime/images/images.yaml"), "utf-8");
    const images = YAML.parse(imgdb)
    if(!req.query.name) {
        return res.json({
            statusCode: 404,
            response: "Please enter the name of the anime you want to access the images of in the 'name' query."
        })
    }else{
    if(!req.query.order) {
    try {
        if(serialmovies.includes(req.query.name)) {
            return res.json({
                statusCode: 400,
                response: "Anime with the name you entered is a serial movie. Please provide all requirments."
            })
        }
    
    return res.sendFile(path.join(process.cwd(), `/anime/images/${req.query.type == "cover" ? "Covers" : req.query.type == "banner" ? "Banners" : "Covers"}/${images[name][req.query.type == "cover" ? "cover" : req.query.type == "banner" ? "banner" : "cover"]}`))
    } catch(err) {
        return res.json({
            statusCode: 500,
            response: "An unknown error has occurred. We probably do not have any anime with the name you entered, or there is an unclear error in the source code. Please contact the developer."
        })
    }
    }else{
        try {
            return res.sendFile(path.join(process.cwd(), `/anime/images/${req.query.type == "cover" ? "Covers" : req.query.type == "banner" ? "Banners" : "Covers"}/${images[name][`movie${req.query.order}`][req.query.type == "cover" ? "cover" : req.query.type == "banner" ? "banner" : "cover"]}`))
        }catch(err) {
            return res.json({
                statusCode: 404,
                response: "This anime is not a serial movie or a movie in this order does not exist."
            })
        }
    }
}
  },
  info: async(req, res) => {
    try {
        if(!req.query.name) {
            return res.json({
                statusCode: 404,
                response: "Please enter the name of the anime you want to access the images of in the 'name' query."
            })
        }
        const infos = YAML.parse(fs.readFileSync(path.join(process.cwd(), "/anime/info/info.yaml"), "utf-8"))
        let name;
        try {
            name = Object.keys(synonyms).includes(req.query.name) ? req.query.name : Object.keys(synonyms)[Number(Object.values(synonyms).indexOf(Object.values(synonyms).find(array => array.includes(req.query.name))))]
        }catch(err) {
            name = null
        }
        if(!infos[name]) {
            return res.json({
                statusCode: 404,
                response: "There is no anime named by " + name + " in our database or there is no anime named by that anywhere"
            })
        }else{
            return res.json({
                statusCode: 200,
                data: infos[name]
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            statusCode: 500,
            response: "An unknown error has occurred. We probably do not have any anime with the name you entered, or there is an unclear error in the source code. Please contact the developer."
        })
    }
  }
}