require('dotenv').config()

const express = require("express");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json())

const posts = [
    {
        username: "WeHaveJoy" , 
        tittle: "post1"
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

const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
res.json({accessToken: accessToken});

})  

function authenticateToken(req, res, next){
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1]
   if (token == null) return res.sendStatus(401) 
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
       if(err)return res.sendStatus(403)
       req.user = user;
       next();
   })
}

app.listen(3000)