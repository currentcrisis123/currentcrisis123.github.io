import CategoryModel from '../models/Category.model.js';
import mongoose from 'mongoose';

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Please name your category' });
        }

        const newCategory = new CategoryModel({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { name } = req.params;
        
        let category;
        if (mongoose.Types.ObjectId.isValid(name)) {
            category = await CategoryModel.findByIdAndDelete(name);
        } else {
            category = await CategoryModel.findOneAndDelete({ name: name });
        }
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
}

export default { getAllCategories, createCategory, deleteCategory };