const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes')
const mongoose = require('mongoose');
const PORT = 5001;

const app = express();

app.use(express.json());

app.use('/', userRoutes);
app.use('/', productsRoutes);

mongoose.connect('mongodb+srv://pratikyesare68:jioaCLJ72S5MVDD3@ecommerce-app.hxfww0m.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-app').
    then(() => console.log('Connected to MongoDB Successfully')).
    catch((err) => console.log('Error Connecting to MongoDB', err));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error listening to the server");
    }
    else {
        console.log(`Listening to the server at ${PORT}`);
    }
})