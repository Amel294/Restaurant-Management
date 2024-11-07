// Path: server\routes\orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder } = require('../controllers/orderController');

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.put('/orders/:orderId', updateOrder);

module.exports = router;
