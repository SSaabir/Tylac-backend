import express from 'express';
import {
createShipment, deleteShipment, getAllShipments, getSingleShipment, updateShipment
} from '../controllers/shipment.controller.js';

const router = express.Router();
// Get all shipments
router.get('/', getAllShipments);
// Get a single shipment
router.get('/:id', getSingleShipment);
// Create a new shipment
router.post('/', createShipment);
// Delete a shipment
router.delete('/:id', deleteShipment);
// Update a shipment
router.patch('/:id', updateShipment);
export default router;

