// lib/data.ts

import { sql } from "@vercel/postgres";
import { ProductField, ImageField } from "@/app/lib/definitions";

export async function fetchImages(entity: string, entity_id: string) {
  try {
    const data = await sql<ImageField>`
      SELECT
        id,
        path,
        entity,
        entity_id
      FROM images
      WHERE entity = ${entity}
      AND
      entity_id = ${entity_id}
    ;`;

    const images = data.rows;
    return images;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch images.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await sql<ProductField>`
      SELECT
        id,
        name,
        description
      FROM products
      WHERE id = ${id}
    ;`;

    const product = data.rows[0];
    return product;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProducts() {
  try {
    const data = await sql<ProductField>`
      SELECT
        id,
        name,
        description
      FROM products
      ORDER BY name ASC
    ;`;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}
