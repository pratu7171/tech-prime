// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {User} = require("../models/User");

// exports.login = async(req, res) => {
//     try {
//         const{email, password} = req.body;

//         //check if the user exists
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(401).json({error:"Invalid credentials"});
//         }

//         //compare the provide password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid){
//             return res.status(401).json({error:"Invalid credentials"});
//         }

//         const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

//         res.json({token});
//     } catch (error) {
//         res.status(500).json({error:"Login failed"});
//     }
// }

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User")

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  signup,
  login,
};
