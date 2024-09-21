// lib/placeholder-data.js

// This file contains placeholder data for your database:
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User Userenko',
    email: 'user@nextmail.com',
    password: '12345678',
    phoneNumber: '+380123456789',
    role: 'user'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Admin Adminko',
    email: 'admin@nextmail.com',
    password: '12345678',
    phoneNumber: '+380123456788',
    role: 'admin'
  },
];

const products = [
  {
    name: 'Gloves',
    description: "Good man's gloves. Material: leather",
  },
  {
    id: '1c9196f5-990f-445d-8930-00b068ea21cc',
    name: 'Snikers',
    description: "Good snikers. Nike",
  },
];

const images = [
  {
    path: '/products/1c9196f5-990f-445d-8930-00b068ea21cc/nike_air_trainer_1.webp',
    entity: 'product',
    entity_id: '1c9196f5-990f-445d-8930-00b068ea21cc',
  },
  {
    path: '/products/1c9196f5-990f-445d-8930-00b068ea21cc/nike_air_trainer_2.webp',
    entity: 'product',
    entity_id: '1c9196f5-990f-445d-8930-00b068ea21cc',
  },
  {
    path: '/products/1c9196f5-990f-445d-8930-00b068ea21cc/nike_air_trainer_3.webp',
    entity: 'product',
    entity_id: '1c9196f5-990f-445d-8930-00b068ea21cc',
  },
  {
    path: '/products/1c9196f5-990f-445d-8930-00b068ea21cc/nike_air_trainer_4.webp',
    entity: 'product',
    entity_id: '1c9196f5-990f-445d-8930-00b068ea21cc',
  },
  {
    path: '/products/1c9196f5-990f-445d-8930-00b068ea21cc/nike_air_trainer_5.webp',
    entity: 'product',
    entity_id: '1c9196f5-990f-445d-8930-00b068ea21cc',
  },
];

module.exports = {
  users,
  products,
  images,
};
