const jwt = require("jsonwebtoken");
const Guide = require('../models/guideSchema')

const guideAuth =  async (req, res , next ) => {
       
        const token = req.header('auth_token') 

        if(!token) {
        return    res.status(401).json({ message : "Please Login to access the resource"})
        }

        try {
            const data = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await Guide.findById(data.id)
            next()
        } catch (error) {
           return res.status(401).json({message : error.message})
        }
       
} 

module.exports = guideAuth;