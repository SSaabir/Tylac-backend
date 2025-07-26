import express from 'express';
import {createInquiry,deleteInquiry,getAllInquiries,getInquiriesByStatus,getInquiriesByUserId,getSingleInquiry,updateInquiry} from '../controllers/inquiry.controller.js';

const router = express.Router();
// Get all inquiries
router.get('/', getAllInquiries);
// Get a single inquiry
router.get('/:id', getSingleInquiry);
// Create a new inquiry
router.post('/', createInquiry);
// Delete an inquiry
router.delete('/:id', deleteInquiry);
// Update an inquiry
router.patch('/:id', updateInquiry);
// Get inquiries by status
router.get('/status/:status', getInquiriesByStatus);
// Get inquiries by user ID
router.get('/user/:userId', getInquiriesByUserId);
export default router;
