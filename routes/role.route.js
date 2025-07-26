import express from 'express';
import {
createRole, deleteRole, getAllRoles, getSingleRole, updateRole
} from '../controllers/role.controller.js';

const router = express.Router();
// Get all roles
router.get('/', getAllRoles);
// Get a single role
router.get('/:id', getSingleRole);
// Create a new role
router.post('/', createRole);
// Delete a role
router.delete('/:id', deleteRole);
// Update a role
router.patch('/:id', updateRole);
export default router;
