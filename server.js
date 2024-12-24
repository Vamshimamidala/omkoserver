const express = require('express');
const mongoose = require('mongoose');
let cors=require('cors');
const contactRoutes = require('./Router/formRouter'); // Menu routes
 
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://vamshimamidala12:pQ5zsquiQLkYuxJy@cluster0.jurkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use the routes
 app.use(contactRoutes)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
