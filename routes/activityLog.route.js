import express from 'express';
import { getActivityLogs, createActivityLog, getActivityLogById, updateActivityLog, deleteActivityLog } from '../controllers/activityLog.controller.js';
const router = express.Router();
// Get all activity logs
router.get('/', getActivityLogs);
// Get a single activity log by ID
router.get('/:id', getActivityLogById);
// Create a new activity log
router.post('/', createActivityLog);
// Update an existing activity log
router.patch('/:id', updateActivityLog);
// Delete an activity log
router.delete('/:id', deleteActivityLog);
export default router;
