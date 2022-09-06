const mongoose = require("mongoose");

// user Schema
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    image: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
});

// export user schema
const User = mongoose.model("Users", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;