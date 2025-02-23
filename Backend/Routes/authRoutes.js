const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/auth.model');
const authRoute = express.Router();

const JWT_SECRET = 'Recipe_secret_key';


async function FetchData(url){
try {
    let res = await fetch(url);
    let data = res.json();
    return data;
} catch (error) {
    console.log("get error:", error)
}
}


authRoute.get('/', async (req, res) => {
    try {
        const recipe_data = "https://api.spoonacular.com/recipes/716429/information?apiKey=87f340ac916042e794ee5f49036f28dc"
        const res = await FetchData(recipe_data)
      
        console.log(res)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went wrong"});
    }
})



// Register route
authRoute.post('/register', async (req, res) => {
    try {
        const { Username, email, password } = req.body;
        console.log("red")
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            Username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register' });
    }
});

// Login route
authRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.status(200).json({
            message: 'User logged in successfully',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = authRoute
