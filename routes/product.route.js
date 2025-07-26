import express from 'express';
import {
createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct
} from '../controllers/product.controller.js';

const router = express.Router();
// Get all products
router.get('/', getAllProducts);
// Get a single product
router.get('/:id', getSingleProduct);
// Create a new product
router.post('/', createProduct);
// Delete a product
router.delete('/:id', deleteProduct);
// Update a product
router.patch('/:id', updateProduct);
export default router;
