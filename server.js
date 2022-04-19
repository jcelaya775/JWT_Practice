require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [{
    username: 'Jorge',
    title: 'Post 1'
},
{
    username: 'Jim',
    title: 'Post 2'
}]

app.get('/posts', autheticateToken, (req, res) => {
    res.json(posts.filter(post => post.username == req.user.name))
})

function autheticateToken(req, res, next) {
    // Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (authHeader == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)