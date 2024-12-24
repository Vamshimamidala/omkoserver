const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    
    service: { 
        type: String,
        required: true,
        enum: ['UI/UX Design', 'Android Development', 'iOS Development', 'Web Development'],
    },
    message: { 
        type: String,
        required: true,
    },
   
});

module.exports = mongoose.model('Contact', contactSchema);
