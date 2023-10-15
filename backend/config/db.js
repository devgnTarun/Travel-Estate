const mongoose = require('mongoose')

const connectToMongo = () => {
    mongoose.connect(process.env.URI || "mongodb://localhost:27017/booking").then((data)=>  {
        console.log(`server connected to  ${data.connection.host}`)
    }
    ).catch((error) => {
        console.log(error)
    })
}

module.exports = connectToMongo;