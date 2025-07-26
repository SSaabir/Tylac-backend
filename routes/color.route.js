import express from 'express';
import { getAllColors,createColor,deleteColor,getSingleColor,updateColor} from '../controllers/color.controller.js';

const router = express.Router();
// Get all colors
router.get('/', getAllColors);
// Get a single color
router.get('/:id', getSingleColor);
// Add a new color
router.post('/', createColor);
// Delete a color
router.delete('/:id', deleteColor);
// Update a color
router.patch('/:id', updateColor);
export default router;