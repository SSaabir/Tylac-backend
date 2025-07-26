import express from 'express';
import { getAllCategories,createCategory,deleteCategory,getSingleCategory,updateCategory} from '../controllers/category.controller.js';

const router = express.Router();
// Get all categories
router.get('/', getAllCategories);
// Get a single category
router.get('/:id', getSingleCategory);
// Create a new category
router.post('/', createCategory);
// Delete a category
router.delete('/:id', deleteCategory);
// Update a category
router.patch('/:id', updateCategory);

export default router;