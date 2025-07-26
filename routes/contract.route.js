import express from 'express';
import { getAllContracts,createContract,deleteContract,getSingleContract,updateContract} from '../controllers/contract.controller.js';

const router = express.Router();
// Get all contracts
router.get('/', getAllContracts);
// Get a single contract
router.get('/:id', getSingleContract);
// Create a new contract
router.post('/', createContract);
// Delete a contract
router.delete('/:id', deleteContract);
// Update a contract
router.patch('/:id', updateContract);

export default router;
