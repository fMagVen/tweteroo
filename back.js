const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let tweets = []

let users = []

app.get('/tweets', (req, res) =>{
    let pages = parseInt(req.query.page)
    if(pages != undefined && (pages == NaN || pages < 1)){
        res.status(400).send("Informe uma página válida!")
    }
    else{
        if(isNaN(pages)) pages = 1
        let tweetsplususers = []
        let username
        let avatar
        let tweet
        let j = tweets.length - ((pages - 1) * 10) 
        let limit = 10
        while(j > 0 && limit > 0){
            for(let i = 0; i < users.length; i++){
                if(tweets[j-1].username === users[i].username){
                    avatar = users[i].avatar
                }
            }
            username = tweets[j-1].username
            tweet = tweets[j-1].tweet
            tweetsplususers.push({username, avatar, tweet})
            j--
            limit--
        }
        res.send(tweetsplususers)
    }
})

app.post('/sign-up', (req, res) => {
    if(req.body.username.length < 1 || req.body.avatar < 1){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    else{
        users.push(req.body)
        res.status(201).send(req.body)
    }
    
})

app.post('/tweets', (req, res) =>{
    if(req.body.tweet.length < 1){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    else{
        tweets.push({username: req.headers.user, tweet: req.body.tweet})
        res.status(201).send({username: req.headers.user, tweet: req.body.tweet})
    }
})

app.get('/tweets/:username', (req, res) =>{
    const username = req.params.username
    let avatar
    let tweetsofauser = []
    for(let i = 0; i < users.length; i++){
        if(username == users[i].username){
            avatar = users[i].avatar
            break
        }
    }
    for(let i = 0; i < tweets.length; i++){
        if(username == tweets[i].username){
            let tweet = tweets[i].tweet
            tweetsofauser.push({username, avatar, tweet})
        }
    }
    res.status(200).send(tweetsofauser.reverse())
})

app.listen(5000)