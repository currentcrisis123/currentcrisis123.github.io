import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    linkedin: {
        type: String,
        required: false,
        trim: true,
        set: v => (typeof v === 'string' && v.trim() === '') ? undefined : v
    },
    role: {
        type: String,
        required: true,
        enum: ['Developer', 'Game Designer', 'Graphic Designer'],
    },
    leadership: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('Developer', developerSchema);