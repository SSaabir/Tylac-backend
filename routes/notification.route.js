import express from 'express';
import {createNotification,deleteNotification,getAllNotifications,getSingleNotification,updateNotification} from '../controllers/notification.controller.js';

const router = express.Router();
// Create a new notification
router.post('/', createNotification);
// Get all notifications
router.get('/', getAllNotifications);
// Get a single notification by ID
router.get('/:id', getSingleNotification);
// Update a notification by ID
router.put('/:id', updateNotification);
// Delete a notification by ID
router.delete('/:id', deleteNotification);

export default router;
