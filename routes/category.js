import express from 'express';
import Category from '../schemas/category.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // Query the database to find the category by their id
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving category data' });
  }
});



export default router;