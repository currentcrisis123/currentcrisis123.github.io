import DevelopersModel from '../models/Developers.model.js'
import mongoose from 'mongoose'

const getDevelopers = async(req, res) => {
    try {
        const devs = await DevelopersModel.find();
        res.status(200).json(devs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching developers', error });
    }
}

const createDeveloper = async(req, res) => {
    try {
    const { name, linkedin: rawLinkedin, role, leadership } = req.body;

        if (!name ) {
            return res.status(400).json({ message: 'Name is required' });
        }

    const linkedin = (typeof rawLinkedin === 'string' && rawLinkedin.trim() !== '') ? rawLinkedin.trim() : undefined;

    const newDev = new DevelopersModel({ 
            name, 
            linkedin,
            role,
            leadership: leadership === undefined ? false : leadership 
        });
        
        const savedDev = await newDev.save();
        res.status(201).json(savedDev);
    } catch (error) {
        console.error('Error in createDeveloper:', error);
        res.status(500).json({ message: 'Error creating developer', error: error.toString() });
    }
}

const deleteDeveloper = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const dev = await DevelopersModel.findByIdAndDelete(id);

        if (!dev) {
            return res.status(404).json({ message: 'Developer not found' });
        }
        
        res.status(200).json({ message: 'Developer deleted successfully', developer: dev });
    } catch (error) {
        console.error('Error in deleteDeveloper:', error);
        res.status(500).json({ message: 'Error deleting developer', error: error.toString() });
    }
}

export default { getDevelopers, createDeveloper, deleteDeveloper}