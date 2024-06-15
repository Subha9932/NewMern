const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/ndata').then(() => {
    console.log("Mongodb connected....")
})

const schema = new mongoose.Schema({
    name: String,
    password: String
})

const User = mongoose.model('users', schema);

const JWT_SECRET_KEY = 'my_secret_key_123';

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'UserAuth.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'UserAuth.html'));
});

app.post('/register', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required.');
    }

    try {
        const newUser = new User({ name, password });
        await newUser.save();
        console.log(`${name} is saved`);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name, password });

        if (user) {
            // Generate JWT token if user is found
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Invalid token');
    }
};

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
