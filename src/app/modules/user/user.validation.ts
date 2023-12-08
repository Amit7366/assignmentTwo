import { z } from 'zod'

// Define a Zod schema for the userName model
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' })
    .max(20, { message: 'First Name can be max 20 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'Last Name must be at least 2 characters long' })
    .max(20, { message: 'Last Name can be max 20 characters long' }),
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
  username: z.string({
    required_error: "User name is required",
  }),
  password: z.string().min(4),
  fullName: userNameSchema,
  age: z.number({required_error: 'Age is required'}),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).default([]),
  address: addressSchema,
  orders: z.array(orderSchema).default([]),
})
