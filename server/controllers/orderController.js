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

const getOrders = async (req, res) => {
    try {
        const { customerName, productName, status, location, sortBy = 'date', sortOrder = 'desc', page = 1, limit = 10, startDate, endDate } = req.query;

        const filter = {};

        if (customerName) {
            filter.customerName = new RegExp(customerName, 'i'); 
        }
        if (productName) {
            filter.productName = new RegExp(productName, 'i');
        }
        if (status) {
            filter.status = status;
        }
        if (location) {
            filter.location = new RegExp(location, 'i'); 
        }
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const orders = await Order.find(filter)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            message: 'Orders fetched successfully',
            page,
            limit,
            totalResults: await Order.countDocuments(filter),
            orders
        });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createOrder, getOrders
};
