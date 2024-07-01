const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async(req, res) => {
    try {
        const{email, password} = req.body;

        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error:"Invalid credentials"});
        }

        //compare the provide password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid credentials"});
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn: "1h"});

        res.json({token});
    } catch (error) {
        res.status(500).json({error:"Login failed"});
    }
};