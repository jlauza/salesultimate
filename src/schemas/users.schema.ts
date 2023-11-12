import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // Add other fields as needed
});

const User = mongoose.model('User', userSchema);