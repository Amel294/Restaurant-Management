// Path: server\server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Server is running');
})
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
