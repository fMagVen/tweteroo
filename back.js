const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let tweets = [
    {
        "username": "bobesponja",
        "tweet": "eu amo o hub1"
    },
    {
        "username": "lulamolusco",
        "tweet": "eu amo o hub2"
    },
    {
        "username": "siriqueijo",
        "tweet": "eu amo o hub3"
    },
    {
        "username": "patrick",
        "tweet": "eu amo o hub4"
    },
    {
        "username": "plankton",
        "tweet": "eu amo o hub5"
    },
    {
        "username": "sandy",
        "tweet": "eu amo o hub6"
    },
    {
        "username": "gary",
        "tweet": "eu amo o hub7"
    },
    {
        "username": "pearl",
        "tweet": "eu amo o hub8"
    },
    {
        "username": "bobesponja",
        "tweet": "eu amo o hub9"
    },
    {
        "username": "lulamolusco",
        "tweet": "eu amo o hub10"
    },
    {
        "username": "siriqueijo",
        "tweet": "eu amo o hub11"
    },
    {
        "username": "patrick",
        "tweet": "eu amo o hub12"
    },
    {
        "username": "plankton",
        "tweet": "eu amo o hub13"
    },
    {
        "username": "sandy",
        "tweet": "eu amo o hub14"
    },
    {
        "username": "gary",
        "tweet": "eu amo o hub15"
    },
    {
        "username": "pearl",
        "tweet": "eu amo o hub16"
    },
    {
        "username": "bobesponja",
        "tweet": "eu amo o hub17"
    },
    {
        "username": "lulamolusco",
        "tweet": "eu amo o hub18"
    },
    {
        "username": "siriqueijo",
        "tweet": "eu amo o hub19"
    },
    {
        "username": "patrick",
        "tweet": "eu amo o hub20"
    },
    {
        "username": "plankton",
        "tweet": "eu amo o hub21"
    },
    {
        "username": "sandy",
        "tweet": "eu amo o hub22"
    },
    {
        "username": "gary",
        "tweet": "eu amo o hub23"
    },
    {
        "username": "pearl",
        "tweet": "eu amo o hub24"
    },
    {
        "username": "bobesponja",
        "tweet": "eu amo o hub25"
    },
    {
        "username": "lulamolusco",
        "tweet": "eu amo o hub26"
    },
    {
        "username": "siriqueijo",
        "tweet": "eu amo o hub27"
    },
    {
        "username": "patrick",
        "tweet": "eu amo o hub28"
    },
    {
        "username": "plankton",
        "tweet": "eu amo o hub29"
    },
    {
        "username": "sandy",
        "tweet": "eu amo o hub30"
    },
    {
        "username": "gary",
        "tweet": "eu amo o hub31"
    },
    {
        "username": "pearl",
        "tweet": "eu amo o hub32"
    }
]

let users = [
    {
        "username": "bobesponja",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg"
    },
    {
        "username": "lulamolusco",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/8/8f/Squidward_Tentacles.svg"
    },
    {
        "username": "siriqueijo",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/f/f8/Mr._Krabs.svg"
    },
    {
        "username": "patrick",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/3/33/Patrick_Star.svg"
    },
    {
        "username": "plankton",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/4/49/Plankton_and_Karen.svg"
    },
    {
        "username": "sandy",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/a/a0/Sandy_Cheeks.svg"
    },
    {
        "username": "gary",
        "avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    },
    {
        "username": "pearl",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/5/5d/Pearl_the_Whale.svg"
    }
]

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
        for(let j = tweets.length; j > tweets.length - 10; j--){
            for(let i = 0; i < users.length; i++){
                if(tweets[j-1].username === users[i].username){
                    avatar = users[i].avatar
                }
            }
            username = tweets[j-1].username
            tweet = tweets[j-1].tweet
            tweetsplususers.push({username, avatar, tweet})
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