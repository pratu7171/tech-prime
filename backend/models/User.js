const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// module.exports = mongoose.model("User", userSchema);

// Creating the User model based on the User schema
const UserModel = mongoose.model("user", userSchema);

// Exporting the UserModel to be used in other files
module.exports = { UserModel };