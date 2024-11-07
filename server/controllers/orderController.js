// Path: server\controllers\orderController.js

const { generateUniqueOrderId } = require('../utils/orderIdGenerator');
const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { customerName, productName, date, quantity, price, location, status } = req.body;

        if (!customerName || !productName || !date || !quantity || !price || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const orderId = await generateUniqueOrderId();

        const newOrder = new Order({
            customerName,
            productName,
            orderId,
            date: new Date(date),
            quantity,
            price,
            location,
            status: status || 'pending' 
        });

        await newOrder.save();
        
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createOrder
};
