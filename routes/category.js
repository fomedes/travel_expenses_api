import express from 'express';
import Category from '../schemas/category.js';
import auth from './auth.js';

const router = express.Router();

router.use(auth);

router.post('/create', async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/:category_id', async (req, res) => {
  try {
    const category_id = req.params.category_id;
    // Query the database to find the category by their id
    const category = await Category.findById(category_id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving category data' });
  }
});

router.get('/find/user/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // Find all categories for the given user
    const categories = await Category.find({ user_id: user_id });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:category_id', async (req, res) => {
  try {
    const category_id = req.params.category_id;
    
    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:category_id', async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const category = await Category.findByIdAndDelete(category_id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;