const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Minimum name length should be 3"],
    },
    phoneNo: {
      type: Number,
      required: true,
      minLength: [10, "Minimum Phone number should be 10"],
    },
    email: {
      type: String,
      unique: [true, "User already exists with this email"],
      required: true,
      validate: [validator.isEmail, "Enter valid email"],
    },
    password: {
      type: String,
      minLength: [8, "Minimum password lenght should be 8"],
      required: true,
      select: false,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        required: true,
        type: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    state : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isGuide: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Location
guideSchema.index({ location: "2dsphere" });

// Password hash
guideSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

guideSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//Get jwt token
guideSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, type : 'guide' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Guide", guideSchema);
