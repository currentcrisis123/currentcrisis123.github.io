import Article from '../models/Article.model.js';

const createArticle = async (req, res) => {
    try {
        const { id, title, content, author, tag } = req.body;

        if (!id || !title || !content || !author || !tag) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newArticle = new Article({ id, title, content, author, tag });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, tag } = req.body;

        if (!title || !content || !author || !tag) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, { 
            title, 
            content, 
            author, 
            tag,
            id: req.body.id
        }, { new: true });
        
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
}

export default { createArticle, getAllArticles, updateArticle, deleteArticle };