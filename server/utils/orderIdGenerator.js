// Path: server\utils\orderIdGenerator.js

const crypto = require('crypto');
const Order = require('../models/Order');

const generateUniqueOrderId = async () => {
    let orderId;
    let orderExists = true;

    while (orderExists) {
        
        orderId = crypto.randomInt(100000, 999999).toString(); 

        const existingOrder = await Order.findOne({ orderId });
        if (!existingOrder) {
            orderExists = false; 
        }
    }

    return orderId;
};

module.exports = { generateUniqueOrderId };
