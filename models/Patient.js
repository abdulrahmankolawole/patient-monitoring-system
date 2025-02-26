const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var validator = require('validator');



const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  heartRates: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return v.every(rate => rate >= 60 && rate <= 100); 
      },
      message: props => `Heart rates must be between 60 and 100.`
    }
  },
  bloodPressure: {
    type: String, // e.g., '120/80'
    required: true
  },
  status: {
    type: String,
    enum: ['Stable', 'Critical', 'Needs Attention'],
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: [true, "Please choose a unique email address"],
    validate: {
      validator: validator.isEmail,
      message: `Please provide a valid email address.`
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [3, 'password cannot be less than 3 characters']
  }
});

patientSchema.pre('save', async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


patientSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
};

patientSchema.methods.createJWT = async function () {
    const jwt_payload = { sub: this._id, email: this.email }
    return jwt.sign(jwt_payload, process.env.JWT_SECRET)
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;