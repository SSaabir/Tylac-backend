import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import notification from "../models/notification.model.js";

// Get all notifications
export const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await notification.find({}).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single notification by ID
export const getSingleNotification = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    try {
        const notificationEntry = await notification.findById(id);
        if (!notificationEntry) {
            return next(errorHandler(404, 'Notification Not Found'));
        }
        res.status(200).json(notificationEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a notification
export const deleteNotification = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    try {
        const notificationEntry = await notification.findByIdAndDelete(id);
        if (!notificationEntry) {
            return next(errorHandler(404, 'Notification Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a notification
export const updateNotification = async (req, res, next) => {
    const { id } = req.params;
    const { title, message, read } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notification' });
    }

    try {
        const updatedNotification = await notification.findByIdAndUpdate(id, { title, message, read }, { new: true });
        if (!updatedNotification) {
            return next(errorHandler(404, 'Notification Not Found'));
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new notification
export const createNotification = async (req, res, next) => {
    const { title, message, userId } = req.body;

    try {
        const newNotification = new notification({ title, message, userId });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
