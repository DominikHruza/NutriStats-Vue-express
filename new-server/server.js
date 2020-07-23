const express = require('express');
const app = express();
const connectDB = require('./config/db');
//Api route imports
const authRoutes = require('./api/auth/auth-routes');;
const mealRoutes = require('./api/meal/meal-routes')

//SETUP
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json({extended: false}));



app.use('/api/auth', authRoutes);
app.use('/api/meal', mealRoutes);


app.listen(PORT, () => console.log(`Server running on ${PORT}`));
