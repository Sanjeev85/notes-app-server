import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const signup = async (req, res) => {
    // existing user
    // hashed password
    // user creation
    // token generate
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: 'user already exists' });
        }
        // this function runs 10 times and 10 generated password stored in hashedPassword
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            SECRET_KEY
        );
        return res.status(201).json({ user: result, token: token });
    } catch (err) {
        return res.status(500).json({ msg: `somethgin went wrong ${err}` });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ msg: "User doesn't exist" });
        }

        const matchPassword = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!matchPassword)
            return res.status(400).json({ msg: 'Invalid credentails' });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            SECRET_KEY
        );
        return res.status(201).json({ user: existingUser, token: token });
    } catch (err) {
        return res.status(500).json({ msg: `somethgin went wrong ${err}` });
    }
};
