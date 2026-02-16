const express = require('express');
const router = express.Router();
const {
    getPortfolio,
    addAsset,
    updateAsset,
    deleteAsset,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/').get(getPortfolio).post(addAsset);
router.route('/:id').put(updateAsset).delete(deleteAsset);

module.exports = router;
