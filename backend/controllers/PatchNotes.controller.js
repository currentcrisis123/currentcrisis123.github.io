import PatchNotes from '../models/PatchNotes.model.js'

const createArticle = async (req, res) => {
    try {
        const { version, date, content } = req.body;

        if (!version || !date || !content) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newArticle = new PatchNotes({ version, date, content });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await PatchNotes.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if it's a valid MongoDB ObjectID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const article = await PatchNotes.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ message: 'Patch note not found' });
        }
        res.status(200).json({ message: 'Patch note deleted successfully' });
    } catch (error) {
        console.error('Error deleting patch note:', error);
        res.status(500).json({ message: 'Error deleting patch note', error: error.toString() });
    }
}

export default { createArticle, getAllArticles, deleteArticle }