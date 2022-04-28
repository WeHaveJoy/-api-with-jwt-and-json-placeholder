require('dotenv').config()

const express = require("express");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json())

const posts = [
    {
        username: "WeHaveJoy" , 
        tittle: "post1"
    },
    {
        username: "Sino" , 
        tittle: "post2"
    }
]




// // fields to be read from the DOM
// const domFields = {
//     description,
//     image,
//     gender,
//     season,
//     price
//   };
  
//   axios.post('/api/garments', domFields)
//     .then((result) => {
//         // show snackbar - with success message
//         console.log(result.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
  

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
    })

app.post('/login', (req,res) => {
    //Auntheticate User

    const username = req.body.username;
    const user = {name: username}

const accessToken =  generateAccessToken(user)
const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
res.json({accessToken: accessToken, refreshTocken: refreshTocken});

})  

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

app.listen(4000)