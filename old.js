const express = require('express');
const cors = require('cors');
const fs = require("fs")
const rateLimit = require('express-rate-limit');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

let UsersData = require("../users.js");

const SigninLimiter = rateLimit({
    windowMs: 4 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Too many login attempts"
    }
});
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log('signup form data:', { name, email, password });

    if (!email || !password || !name) {
        return res.status(400).json({
            status: false,
            message: "form field are required"
        })
    }
    const newUserExist = UsersData.find(user => user.email === email)
    if (newUserExist) {
        return res.status(400).json({
            status: false,
            message: "user already exist"
        })
    }
    const newUser = {
        id: UsersData.length + 1,
        name,
        email,
        password,
    };
    UsersData.push(newUser)
    const userContent = `const users = ${JSON.stringify(UsersData, null, 2)};\n\nmodule.exports = users;`

    fs.writeFile("./users.js", userContent, (err) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "failed to saved user data"
            })
        }
    })
    res.status(200).json({
        status: true,
        message: 'Signup successful',
        data: newUser,
    });
});
app.post("/signin", SigninLimiter, (req, res) => {
    const { email, password } = req.body;
    console.log('login form data:', { email, password });

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "form field are required"
        })
    }
    if (req.rateLimit.remaining !== 1) {
        return res.status(400).json({
            status: false,
            message: "Too many attempts try again in 5 minutes!"
        })
    }
    const newUserExist = UsersData.find(user => user.email === email)
    if (!newUserExist) {
        return res.status(400).json({
            status: false,
            message: "user does not exist"
        })
    }
    if (newUserExist.password !== password) {
        return res.status(400).json({
            status: false,
            message: "invalid credentials"
        })

    }
    res.status(200).json({
        status: true,
        message: 'Signin successful',

    });

})
app.post('*', (req, res) => {
    res.status(404).json({ status: false, message: '404 - Url Not Found' });
});
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
