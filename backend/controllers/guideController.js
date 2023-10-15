const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Token = require("../models/tokenSchema");
const sendEmail = require("../middlewares/sendEmail");
const crypto = require("crypto");
const Guide = require("../models/guideSchema");
const User = require("../models/userSchema");

//Register Guide
exports.registerGuide = async (req, res) => {
  try {
    const { name, email, password, latitude, longitude, city, phoneNo, state } =
      req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Booking",
      width: 150,
      crop: "scale",
    });

    const preUserGuide = await Guide.findOne({ email });
    const preUser = await User.findOne({ email });

    if (preUser || preUserGuide) {
      return res
        .status(401)
        .json({ message: "User already Exists on this email" });
    }
    
    const user = await Guide.create({
      name,
      email,
      password,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      city,
      phoneNo,
      state,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const url = `${req.protocol}://${req.get("host")}/guide/${
      user._id
    }/verify/${token.token}`;
    const options = {
      email: user.email,
      token: url,
    };

    await sendEmail(options);

    res
      .status(200)
      .json({
        success: true,
        message: `Email verification has sent on your email!! `,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Verify Guide token

exports.verifyToken = async (req, res, next) => {
  try {
    const user = await Guide.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ message: "Invalid link" });
    }

    await user.updateOne({ _id: user._id, verified: true });
    await token.deleteOne({ userId: user._id, token: null });

    res.status(200).json({ message: "Email Verified Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Login Guide
exports.loginGuide= async (req, res) => { 
  const {email , password} = req.body;
 
  try {

    const user = await Guide.findOne({email}).select("+password");
    if(!user) {
      return res.status(404).json({message : 'User not found on this email'})
    }

    const isMatched = await  user.comparePassword(password)
    if(!isMatched) {
      return res.status(401).json({message : 'Please enter the valid credentials'})
    }

    if(!user.verified) {
      let token = await Token.findOne({userId : user._id});
    
      if(!token) {
        token = await Token.create({
          userId : user._id,
          token : crypto.randomBytes(32).toString('hex')
        })
        const url = `${req.protocol}://${req.get("host")}/guide/${user._id}/verify/${token.token}`
        const options = {
          email : user.email,
          token : url
        }
        await sendEmail(options)
      }
      return res.status(400).json({message : 'Verify your email, for logging in'})
    }
    const token = await user.getJWTToken()
    
    res.status(200).json({message : 'User logged in successfully!' , token , user})

  } catch (error) {
    res.status(500).json({message : error.message})
  }
}


//Login Guide
exports.getAllGuides = async (req, res) => { 
  try {
    const guides = await Guide.find()

    if(!guides)  {
      res.status(404).json({message : 'No Guides available currently!'})
    }

    res.status(200).json({success : true,guides})
  } catch (error) {
    res.status(500).json({message : error.message})
  }
 }