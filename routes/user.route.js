import express from 'express';
import {createUser,deleteUser,getAllUsers,getSingleUser,updateUser} from '../controllers/user.controller.js';

const router = express.Router();
// Get all users
router.get('/', getAllUsers);
// Get a single user
router.get('/:id', getSingleUser);
// Create a new user
router.post('/', createUser);
// Delete a user
router.delete('/:id', deleteUser);
// Update a user
router.patch('/:id', updateUser);
export default router;
