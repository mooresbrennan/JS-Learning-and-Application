const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

const data = JSON.parse(fs.readFileSync("radiohead.json", "utf8"));

app.use(cors);

app.get("/albums", (req, res) => {
    res.json(data.discography.albums);
});

app.get("/album", (req, res) =>{
    const name = req.query.name.toLowerCase();
    const album = data.discography.albums.find(a => a.name.toLowerCase() === name);
    if (album) {
        res.json(album);
    } else {
        res.status(404).json({error: "Not Found"});
    }
});

app.get("/song", (req, res) => {
    const title = req.query.name.toLowerCase();
    for (let album of data.discography.albums) {
        const found = album.songs.find(s => s.toLowerCase() === title);
        if (found) {
            return res.json({
                song: found,
                album: album.name,
                year: album.release
            });
        }
    }
    res.status(404).json({error: "Not found"});
})

