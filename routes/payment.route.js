import express from 'express';
import {
createPayment, deletePayment, getAllPayments, getSinglePayment, updatePayment
} from '../controllers/payment.controller.js';

const router = express.Router();
// Get all payments
router.get('/', getAllPayments);
// Get a single payment
router.get('/:id', getSinglePayment);
// Create a new payment
router.post('/', createPayment);
// Delete a payment
router.delete('/:id', deletePayment);
// Update a payment
router.patch('/:id', updatePayment);
export default router;
