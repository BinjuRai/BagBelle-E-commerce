
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (data) => {
    const hashed = await bcrypt.hash(data.password, 10);
    return await User.create({ ...data, password: hashed });
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


