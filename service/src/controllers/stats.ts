export {}
const express = require('express')
const { connect } = require('../services/connect')

const statsRouter = express.Router()

statsRouter.get ("/users", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

statsRouter.get ("/posts", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

statsRouter.get ("/waitings", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

statsRouter.get ("/victories", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

statsRouter.get ("/supporters", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

statsRouter.get ("/visited", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	const data = req.body

	rsp.json({'success': true})
	rsp.end
})

module.exports = statsRouter
