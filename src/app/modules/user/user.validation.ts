import { z } from 'zod'

// Define a Zod schema for the userName model
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(20),
  lastName: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(20),
})

// Define a Zod schema for the address model
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

// Define a Zod schema for the order model
const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

// Define a Zod schema for the user model
export const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).default([]),
  address: addressSchema,
  orders: z.array(orderSchema).default([]),
})
