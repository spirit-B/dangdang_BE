const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            unique: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);