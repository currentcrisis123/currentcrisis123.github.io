import mongoose from 'mongoose';

const patchNotesSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model('PatchNotes', patchNotesSchema);