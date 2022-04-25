const express = require("express");
const app = express();

const posts = [
    {
        username: "WeHaveJoy"  
    }
]

app.get("/posts", (req, res) => {
    res.json(posts)
    })

app.listen(3000)