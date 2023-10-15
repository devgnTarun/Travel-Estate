require('dotenv').config({path : 'backend/config/config.env'})
const app = require('./app')
const connectToMongo = require('./config/db')
const cloudinary = require('cloudinary')



//Cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET,
})

const port = process.env.PORT 

connectToMongo()


app.listen(port , () => {
    console.log(`Server running on port ${port} `)
})
