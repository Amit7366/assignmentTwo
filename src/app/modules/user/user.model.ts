import { Schema, model } from 'mongoose';
import { TAddress, TOrder, TUser, TUserName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});


const orderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});



const userSchema = new Schema<TUser>({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: userNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: { type: [String], default: [] },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema], default: [] },
});

userSchema.pre('save',async function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_saltround)
      );
      next();
  });
  userSchema.post('save', function(doc,next){
    doc.password = 'your chosen pasword';
    next()
  })
  userSchema.post('findOne', function(doc,next){
    doc.password = 'your chosen pasword';
    next()
  })

export const User = model<TUser>('User', userSchema);