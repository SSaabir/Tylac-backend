import mongoose from 'mongoose';
import validator from 'validator';
import dotenv from 'dotenv';

const RoleSchema = new mongoose.Schema({
  roleType: { type: String, enum: ['Admin', 'Customer', 'Manager', 'Guest', 'Employee', 'SalesRepresentative'] },
  description: String
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  roleId: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const AddressSchema = new mongoose.Schema({
  country: String,
  state: String,
  city: String,
  addressLine1: String,
  addressLine2: String,
  zipCode: String,
  isDefault: { type: Boolean, default: false },
  userId: String,
  dealerId: String,
  createdAt: Date,
  updatedAt: Date
});

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  categoryId: String,
  basePrice: Number,
  finalPrice: Number,
  imageUrl: String,
  createdBy: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const ColorSchema = new mongoose.Schema({
  name: String,
  hexCode: String,
  productId: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const OfferSchema = new mongoose.Schema({
  name: String,
  description: String,
  code: String,
  productId: String,
  discountPercentage: Number,
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  dealerId: String,
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] },
  createdAt: Date,
  updatedAt: Date
});

const OrderItemSchema = new mongoose.Schema({
  orderId: String,
  productId: String,
  colorId: String,
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
});

const InvoiceSchema = new mongoose.Schema({
  orderId: String,
  totalAmount: Number,
  pdfUrl: String,
  createdAt: Date,
  updatedAt: Date
});

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  method: { type: String, enum: ['CreditDebitCard', 'PayPal', 'BankTransfer', 'CashOnDelivery'] },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'] },
  createdAt: Date,
  updatedAt: Date
});

const ShipmentSchema = new mongoose.Schema({
  orderId: String,
  trackingNumber: String,
  carrier: String,
  shippedAt: Date,
  deliveredAt: Date,
  status: { type: String, enum: ['Pending', 'Shipped', 'InTransit', 'Delivered', 'Cancelled'] },
  addressId: String,
  createdAt: Date,
  updatedAt: Date
});

const DealerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  contactPerson: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const DealerContractSchema = new mongoose.Schema({
  dealerId: String,
  contractNumber: String,
  startDate: Date,
  endDate: Date,
  discountPercentage: Number,
  maxCreditDays: Number,
  maxCreditLimit: Number,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
});

const ReviewSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  rating: Number,
  comment: String,
  createdAt: Date,
  updatedAt: Date
});

const InquirySchema = new mongoose.Schema({
  userId: String,
  dealerId: String,
  subject: String,
  message: String,
  isResolved: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

const NotificationSchema = new mongoose.Schema({
  userId: String,
  dealerId: String,
  typed: { type: String, enum: ['Order', 'Shipment', 'Payment', 'Inquiry', 'General'] },
  title: String,
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

const ActivityLogSchema = new mongoose.Schema({
  userId: String,
  dealerId: String,
  action: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
});
