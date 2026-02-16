const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Registration attempt for: ${email}`);

    if (!name || !email || !password) {
        console.log('Registration failed: Missing fields');
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log(`Registration failed: User already exists - ${email}`);
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    try {
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            console.log(`User created successfully: ${email}`);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        console.error(`User creation error: ${error.message}`);
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
        console.log(`User not found: ${email}`);
        res.status(401);
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    console.log(`Password match for ${email}: ${isMatch}`);

    if (isMatch) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
};
