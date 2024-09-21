// lib/definitions.ts

// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'admin' | 'user';
  createdAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  supply: {size: string, count: number}[];
  // available: boolean;
};

// export type Image = {
//   id: string;
//   entity: string;
//   entityId: string;
// };

// Database tables

export type ProductField = {
  id: string;
  name: string;
  description: string;
}

export type ImageField = {
  id: string;
  path: string;
  entity: string;
  entity_id: string;
}
