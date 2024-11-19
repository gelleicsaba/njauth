export {}
const express = require('express')
const { connect } = require('../services/connect')

const ideasRouter = express.Router()

ideasRouter.get ("/", express.json ({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	const db = await connect()
	const all = db.db("db").collection("ideas").find({})
	const items=[]
	for await (const doc of all) {
		items.push(doc)
	}
	rsp.json ({"items": items})
	rsp.end
})

ideasRouter.get ("/search", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body
	const text :string = req.query.text

	const db = await connect()
	const words = text.trim().split(" ")
	let regexstr = ""
	let first = true
	for (const word of words) {
		if (first) {
			regexstr += `(${word})`
			first = false
		} else {
			regexstr += `|(${word})`
		}
	}
	const regexp = new RegExp(regexstr, "gi");
	const all = db.db("db").collection("ideas").find({$and: [ {$or: [{"content": regexp}, {"title": regexp}]}, {"public": true}, {"publish": true} ] })
	const items=[]
	for await (const doc of all) {
		items.push(doc)
	}
	rsp.json ({"items": items})
	rsp.end
})

ideasRouter.get ("/random", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	const db = await connect()
	const ids = db.db("db").collection("ideas").find({"public": true, "publish": true}).project({"_id": 1})
	const items = []
	for await (const d of ids) {
		items.push(d._id);
	}
	const idx = Math.floor(Math.random() * items.length)
	// console.log(items[idx])
	const item = await db.db("db").collection("ideas").findOne({"_id": items[idx]})
	rsp.json(item)
	rsp.end
})

ideasRouter.get ("/latest", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

module.exports = ideasRouter
