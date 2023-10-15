require('dotenv').config({path : 'backend/config/config.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')




app.use(fileUpload())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cors())

const user = require('./routes/userRoutes.js')
const guide = require('./Routes/guideRoutes.js')

app.use('/api', user )
app.use('/api', guide )


module.exports = app; 