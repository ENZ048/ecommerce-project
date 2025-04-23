const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {

        // console.log("Password received:", req.body.password);

        await userModel.create(req.body);

        res.status(200).json({
            success: true,
            message: 'User Registered Successfully!'
        })
    }
    catch (err) {
        console.log("Error registering the user", err);
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({
                message: "No user registered with this email. SignUp instead"
            });
        }

        if (user) {

            const isPasssowrdValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasssowrdValid) {
                res.status(400).json({
                    message: "Invalid email or password"
                });
            }

            res.status(200).json({
                success: true,
                message: "User Logged in successfully",
                user: user
            });
        }

    }
    catch (err) {
        console.log("Error loging in the user", err);
    }
}

const logoutUser = async (req, res) => {
    try {

    }
    catch (err) {
        console.log("Error loging out the user", err);
    }
}

module.exports = { registerUser, loginUser, logoutUser };