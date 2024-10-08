const express = require('express');
const cors = require('cors');
const app = express();
const questionRoutes = require('./routes/questions');
const dbConnection = require('./config/db');

app.use(cors());
app.use(express.json());
app.use('/api/questions', questionRoutes);

app.listen(3000, () => {
    console.log('Server is running on the port 3000');
});