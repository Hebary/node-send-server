import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true

    },
    downloads: {
        type: Number,
        default: 1
    },
    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    password:{
        type: String,
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

const Links = mongoose.model('Links', Schema)

export default Links;