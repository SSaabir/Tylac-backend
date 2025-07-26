import express from 'express';
import {getAllInvoices,createInvoice,deleteInvoice,getSingleInvoice,updateInvoice} from '../controllers/invoice.controller.js';

const router = express.Router();
// Get all invoices
router.get('/', getAllInvoices);
// Get a single invoice
router.get('/:id', getSingleInvoice);
// Create a new invoice
router.post('/', createInvoice);
// Delete an invoice
router.delete('/:id', deleteInvoice);
// Update an invoice
router.patch('/:id', updateInvoice);
export default router;