export {}
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const homeRouter = require('./controllers/home')
const userRouter = require('./controllers/user')
const maintenanceRouter = require ('./controllers/maintenance')
const ideasRouter = require('./controllers/ideas')
const statsRouter = require('./controllers/stats')
const profileRouter = require('./controllers/profile')

const PORT = 3000
const HOST_NAME = "localhost"

const app = express()
app.use(express.static ("client"))
app.use(bodyParser.urlencoded ({extended: true}))

/*
app.use( (req: any, res: any, next: any) => {
    // specify other headers here
    next()
})
*/

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET','HEAD','POST','PUT','DELETE','PATCH'],
}
app.use(cors(corsOptions))
app.use("/content", homeRouter)
app.use("/user", userRouter)
app.use("/maintenance", maintenanceRouter)
app.use("/ideas", ideasRouter)
app.use("/stats", statsRouter)
app.use("/profile", profileRouter)

app.listen (PORT, HOST_NAME, () => {
    console.log (`Server running at ${HOST_NAME}:${PORT}`)
})
