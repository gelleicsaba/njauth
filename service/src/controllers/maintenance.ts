export {}
const express = require('express')
const maintenanceRouter = express.Router()
const { connect } = require('../services/connect')
const { apikey } = require('../services/apikey')

maintenanceRouter.post("/", express.json({type: '*/*'}), async (req?: any, res?: any) => {
    /*<request-template>
    {
        "hash": ""
    }
    </request-template>*/
    res.write('Maintenance service.')
    const data = req.body
    const hash = data.hash
    if (hash != apikey) {
        res.write("Forbidden!")
    } else {
        const db = await connect()
        const exptime = Math.floor(Date.now() / 1000)
        const all = db.db("db").collection("logins").find({
            exp: {
                $lt: exptime
            }
        })
        for await (const doc of all) {
            await db.db("db").collection("logins").deleteOne(doc)
        }
        res.write("Done.")
    }
    res.end()
})

module.exports = maintenanceRouter