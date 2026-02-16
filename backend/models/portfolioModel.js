const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add the asset name'],
        },
        symbol: {
            type: String,
            required: [true, 'Please add the asset symbol'],
        },
        quantity: {
            type: Number,
            required: [true, 'Please add the quantity'],
        },
        buyPrice: {
            type: Number,
            required: [true, 'Please add the buy price'],
        },
        purchaseDate: {
            type: Date,
            required: [true, 'Please add the purchase date'],
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
