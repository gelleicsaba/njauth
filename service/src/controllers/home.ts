export {}
const express = require('express')
const homeRouter = express.Router()
const { connect } = require ('../services/connect')

homeRouter.get("/:id", async (req?: any, res?: any) => {
    const id = parseInt(req.params.id)
    const db = await connect ()
    const content = await db.db ("db").collection ("static_contents").findOne ({"id": id})
    res.json(content)
    res.end()
})

module.exports = homeRouter