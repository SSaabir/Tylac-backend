import express from 'express';
import {
createOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrder
} from '../controllers/order.controller.js';

const router = express.Router();
// Get all orders
router.get('/', getAllOrders);
// Get a single order
router.get('/:id', getSingleOrder);
// Create a new order
router.post('/', createOrder);
// Delete an order
router.delete('/:id', deleteOrder);
// Update an order
router.patch('/:id', updateOrder);
export default router;
