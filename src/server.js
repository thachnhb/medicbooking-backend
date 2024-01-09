import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'

require('dotenv').config()

let app = express()

//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()

//PORT = undefined => 8088
let port = process.env.PORT || 8088

app.listen(port, () => {
    console.log('backend is running on port: ' + port)
})
