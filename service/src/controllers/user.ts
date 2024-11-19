export {}
const express = require('express')
const MD5 = require('crypto-js/md5')
const { connect } = require('../services/connect')

const userRouter = express.Router()

const hashchars="0123456789abcdef"

const randomHash = () => {
    let sb = ""
    for (let x=0;x<64;++x) {
        sb += hashchars[ Math.floor(Math.random() * 16)]
    }
    return new Date().getTime().toString(16) + sb
}

userRouter.get ("/", express.json({type: '*/*'}), async (req?: any, res?: any) => {
    res.json({"success": true})
    res.end()
})

userRouter.put ("/login", express.json({type: '*/*'}), async (req?: any, res?: any) => {
    /*<request-template>
    {
        "user": "admin",
        "pass": "qq"
    }
    </request-template>*/
    const data = req.body
    const name = data.user
    const pass = MD5(`!%?${data.pass}??!`).toString()
    const db = await connect()
    const user = await db.db("db").collection("users").findOne({"name": name, "pass": pass})
    const hash = randomHash()
    if (user==null) {
        res.json({"success": false, "error": "not found"})
    } else {
        const doc = { _id: hash, uid: user._id, exp: Math.floor(Date.now() / 1000) + 600 }
        const result = await db.db("db").collection("logins").insertOne(doc)
        res.json({
            "success": true,
            "hash": hash,
            "msg": "inserted",
            "userData": {
                "name": user.name,
                "email": user.email,
                "fullname": user.fullname,
                "interest": user.interest,
                "reddit": user.reddit,
                "public": user.public
            }
        })
    }

/*
  "_id": "671278cd92dd034c076ce6f1",
  "email": "admin@localhost",
  "name": "admin",
  "pass": "3f1d3f87a3de593cdce42f0cfe7bb0ea",
  "fullname": "Admin",
  "interest": "Java .Net c# Angular React Vue Python NodeJS",
  "reddit": "https://www.reddit.com/user/Pitiful-Ad-858/",
  "public": true
*/

    res.end()
})

userRouter.delete ("/logout", express.json({type: '*/*'}), async (req?: any, res?: any) => {
    /*<request-template>
    {
        "hash": ""
    }
    </request-template>*/
    const data = req.body
    const hash = req.headers.hash
    const db = await connect()
    const login = await db.db("db").collection("logins").findOne({"_id": hash})
    if (login==null) {
        res.json({"success": false, "error": "not found"})
    } else {
        const result = await db.db("db").collection("logins").deleteOne(login)
        res.json({"success": true, "msg": "removed"})
    }
    res.end()
})

userRouter.post ("/check", express.json({type: '*/*'}), async (req?: any, res?: any) => {
    /*<request-template>
    {
        "hash": ""
    }
    </request-template>*/
    const data = req.body
    const hash = req.headers.hash
    console.log(req.headers)
    const db = await connect()
    const login = await db.db("db").collection("logins").findOne({"_id": hash})
    if (login==null) {
        res.json({"success": false, "error": "not found"})
    } else {
        const user = await db.db("db").collection("users").findOne({"_id": login.uid})
        if (user==null) {
            res.json({"success": false, "error": "not found"})
        } else {
            res.json({"success": true, "msg": "checked", "userData": { "name": user.name, "email": user.email, "uid": login.uid }})
        }
    }
    res.end()
})

module.exports = userRouter


/*
Login session:
curl -s --header "Content-Type: application/json" --request PUT --data '{"user":"admin","pass":"qq"}' http://localhost:3000/user/login | jq

Logout session:
curl -s --header "Content-Type: application/json" --request DELETE --data '{"hash":"7421dd4c2bbc0af89e155548db0f7e7ad61c1f4e795cf134d41691f8ef12de3a"}' http://localhost:3000/user/logout | jq

Check session:
curl -s --header "Content-Type: application/json" --request POST --data '{"hash":"7421dd4c2bbc0af89e155548db0f7e7ad61c1f4e795cf134d41691f8ef12de3a"}' http://localhost:3000/user/check | jq

    const id = parseInt(req.params.id)

$str = "!%?Hello??!";
*/
