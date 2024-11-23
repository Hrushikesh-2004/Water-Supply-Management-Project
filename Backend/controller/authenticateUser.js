const userModel = require('../model/userDetailsSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username,phone, email, password, role } = req.body; 
    const user = await userModel.findOne({
        $or: [
          { username: username },
          { phone: phone },
          { email: email }
        ]
    });

    if (user) {
        return res.status(400).json({ 
            success: false,
            message: "User already exists!" 
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username,phone, email, password: hashedPassword, role });

    try {
        await newUser.save();
        res.status(200).json({ 
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id, role: user.role, name: user.username }, "secret");
    res.json({ token, userID: user._id, role: user.role, username: user.username });
}


module.exports = {registerUser, loginUser}