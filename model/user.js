const mongoose = require("mongoose");

const User = mongoose.model("User", {
    namaDepan: {
        type: String,
        required: true,
    },
    namaBelakang: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarColor: {
        type: String,
    },
})

module.exports = User;