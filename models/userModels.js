const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First Name is Required!"]
    },
    lastName:{
        type: String,
        required: false,
        default: 'NA'
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: function(e){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
            },
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function(pass){
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pass);
            },
            message: (props) => `${props.value} is not a valid Password!`
        }
    },
    mobileNo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
        validate:{
            validator: function(v){
                return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`
        }
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female", "others"]
    }
})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;