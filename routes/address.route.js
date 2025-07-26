import express from 'express';
import {createAddress, deleteAddress, getAllAddresses, getSingleAddress, updateAddress} from '../controllers/address.controller.js';

const router = express.Router();
// Get all addresses
router.get('/', getAllAddresses);
// Get a single address
router.get('/:id', getSingleAddress);
// Create a new address
router.post('/', createAddress);
// Delete an address
router.delete('/:id', deleteAddress);
// Update an address
router.patch('/:id', updateAddress);
export default router;