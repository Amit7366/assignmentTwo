import { Schema, model } from 'mongoose'
import {
  TAddress,
  TOrder,
  TUser,
  TUserName,
  UserMethod,
  UserModel,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, UserModel, UserMethod>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: userNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], default: [] },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema] },
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;


  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_saltround),
  )
  next()
});

// userSchema.pre('findOneAndUpdate', async function(next) {
//   const update = this._update;
//   console.log(update);
// });



userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// userSchema.post('findOne', function (doc, next) {
//   doc.password = ''
//   next()
// })

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = User.findOne({ userId })

  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
