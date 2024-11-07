// Path: server\server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());

app.use('/', (req,res)=>{
    res.send('Hello World')
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
