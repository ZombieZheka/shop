import bcrypt from 'bcryptjs';
import { db, VercelPoolClient } from '@vercel/postgres';
import {
  users,
  products,
  images,
} from '../lib/placeholder-data';

async function seedUsers(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // Create the "users" table if it doesn't exist
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log(`Created "users" table`);

  // Insert data into the "users" table
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      // const hashedPassword = user.password;
      return client.sql`
      INSERT INTO users (name, email, password, phone_number, role)
      VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.phoneNumber}, ${user.role})
      ON CONFLICT (email) DO NOTHING;
    `;
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);

  return insertedUsers;
}

async function seedProducts(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(
        (product) => {
          if (product.id) {
            return client.sql`
              INSERT INTO products (id, name, description)
              VALUES (${product.id}, ${product.name}, ${product.description})
              ON CONFLICT (id) DO NOTHING;
            `
          } else {
            return client.sql`
              INSERT INTO products (name, description)
              VALUES (${product.name}, ${product.description})
              ON CONFLICT (id) DO NOTHING;
            `
          }
        },
      ),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedImages(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "images" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS images (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        path TEXT NOT NULL UNIQUE,
        entity VARCHAR(255) NOT NULL,
        entity_id VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "images" table`);

    // Insert data into the "images" table
    const insertedImages = await Promise.all(
      images.map(
        (image) => client.sql`
        INSERT INTO images (path, entity, entity_id)
        VALUES (${image.path}, ${image.entity}, ${image.entity_id})
        ON CONFLICT (path) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedImages.length} images`);

    return {
      createTable,
      images: insertedImages,
    };
  } catch (error) {
    console.error('Error seeding images:', error);
    throw error;
  }
}

export async function GET(): Promise<void | Response> {
  // if (process.env.NODE_ENV === "production") {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };
  // }

  const client = await db.connect();
  try {
    // const client = await db.connect();
    // await client.sql`BEGIN`;
    await seedUsers(client);
    await seedProducts(client);
    await seedImages(client);
    // await client.sql`COMMIT`;
    // return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    // await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
  return;
}
