export {}
const express = require('express')
const { connect } = require('../services/connect')
const MD5 = require('crypto-js/md5')

const profileRouter = express.Router()

profileRouter.post ("/", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	/*<request-template>
		{
			"fullname": "Admin"
			"email": "admin@localhost"
			"interest": "Java .Net c# Angular React Vue Python NodeJS"
			"reddit": "https://www.reddit.com/user/Pitiful-Ad-858/"
			"public": true
		}
	</request-template>*/

	const data = req.body
	const hash = req.headers.hash

    const db = await connect()
    const login = await db.db("db").collection("logins").findOne({_id: hash})
    if (login==null) {
        rsp.json({"success": false, "error": "not found"})
    } else {
		const upd = await db.db("db").collection("users").updateOne(
			{
				_id: login.uid
			}
			, {
				$set: {
					fullname: data.fullname,
					interest: data.interest,
					reddit: data.reddit,
					public: data.public
				}
			}
			/*, (err: any, res: any) => {
				if (err) throw err;
				console.log("1 document updated");
				db.close();
			}*/
		)
        if (!upd) {
            rsp.json({"success": false, "error": "not found"})
        } else {
            rsp.json({"success": true, "msg": "stored" })
        }
    }
	rsp.end
})

profileRouter.put ("/", express.json({type: '*/*'}), async (req: any, rsp: any) => {
	/*<request-template>
		{
			"fullname": "Test"
			"email": "test@localhost"
			"password": "qq"
		}
	</request-template>*/

	const data = req.body

    const db = await connect()
    const login = await db.db("db").collection("users").findOne({$or: [{name: data.name }, {email: data.email }]})
	console.log(login)
    if (login!=null) {
        rsp.json({"success": false, "error": "in use"})
    } else {
		const upd = await db.db("db").collection("users").insertOne(
			{
				name: data.name,
				email: data.email,
				pass: MD5(`!%?${data.pass}??!`).toString(),
				public: false,
				fullname: '',
				interest: '',
				reddit: ''
		})
        if (!upd) {
            rsp.json({"success": false, "error": "insert error"})
        } else {
            rsp.json({"success": true, "msg": "stored" })
        }
	}
	rsp.end
})

module.exports = profileRouter
