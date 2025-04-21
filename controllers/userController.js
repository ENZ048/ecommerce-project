const userModel = require('../models/userModels');

const registerUser = async (req, res) => {
    try{
        console.log(req.body);
        await userModel.create(req.body);

        res.status(200).json({
            success: true,
            mesaage: 'User Registered Successfully!'
        })
    }
    catch(err){
        console.log("Error registering the user", err);
    }
}

const loginUser = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error loging in the user", err);
    }
}

const logoutUser = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error loging out the user", err);
    }
}

module.exports = {registerUser, loginUser, logoutUser};