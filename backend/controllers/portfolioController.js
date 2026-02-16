const Portfolio = require('../models/portfolioModel');

// @desc    Get all portfolio assets
// @route   GET /api/portfolio
// @access  Private
const getPortfolio = async (req, res) => {
    const assets = await Portfolio.find({ user: req.user.id });
    res.status(200).json(assets);
};

// @desc    Add new asset
// @route   POST /api/portfolio
// @access  Private
const addAsset = async (req, res) => {
    const { name, symbol, quantity, buyPrice, purchaseDate, notes } = req.body;

    if (!name || !symbol || !quantity || !buyPrice || !purchaseDate) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const asset = await Portfolio.create({
        user: req.user.id,
        name,
        symbol,
        quantity,
        buyPrice,
        purchaseDate,
        notes,
    });

    res.status(201).json(asset);
};

// @desc    Update asset
// @route   PUT /api/portfolio/:id
// @access  Private
const updateAsset = async (req, res) => {
    const asset = await Portfolio.findById(req.params.id);

    if (!asset) {
        res.status(404);
        throw new Error('Asset not found');
    }

    // Check if user owns the asset
    if (asset.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedAsset = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedAsset);
};

// @desc    Delete asset
// @route   DELETE /api/portfolio/:id
// @access  Private
const deleteAsset = async (req, res) => {
    const asset = await Portfolio.findById(req.params.id);

    if (!asset) {
        res.status(404);
        throw new Error('Asset not found');
    }

    // Check if user owns the asset
    if (asset.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await asset.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getPortfolio,
    addAsset,
    updateAsset,
    deleteAsset,
};
