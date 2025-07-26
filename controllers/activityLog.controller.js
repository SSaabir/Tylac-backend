import activityLog from '../models/activityLog.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

//get all activity logs
export const getAllActivityLogs = async (req, res, next) => {
    try {
        const activityLogs = await activityLog.find({}).sort({ createdAt: -1 });
        res.status(200).json(activityLogs);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
    }

//get a single activity log by ID
export const getSingleActivityLog = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity log' });
    }

    try {
        const activityLogEntry = await activityLog.findById(id);
        if (!activityLogEntry) {
            return next(errorHandler(404, 'Activity Log Not Found'));
        }
        res.status(200).json(activityLogEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

//delete an activity log
export const deleteActivityLog = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity log' });
    }

    try {
        const activityLogEntry = await activityLog.findByIdAndDelete(id);
        if (!activityLogEntry) {
            return next(errorHandler(404, 'Activity Log Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

//update an activity log
export const updateActivityLog = async (req, res, next) => {
    const { id } = req.params;
    const { userId, dealerId, action, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such activity log' });
    }

    try {
        const updatedActivityLog = await activityLog.findByIdAndUpdate(
            id,
            { userId, dealerId, action, description },
            { new: true }
        );
        if (!updatedActivityLog) {
            return next(errorHandler(404, 'Activity Log Not Found'));
        }
        res.status(200).json(updatedActivityLog);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

//create a new activity log
export const createActivityLog = async (req, res, next) => {
    const { userId, dealerId, action, description, ipAddress } = req.body;

    try {
        const newActivityLog = new activityLog({
            userId,
            dealerId,
            action,
            description,
            ipAddress
        });

        const savedActivityLog = await newActivityLog.save();
        res.status(201).json(savedActivityLog);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

