/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user)

  // eslint-disable-next-line no-unused-vars
  const { password, ...newUser } = result.toObject()
  return newUser
}

const getUserFromDb = async () => {
  const result = await User.aggregate([
    {
      $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
    },
  ])
  return result
}
const getSingleUserFromDb = async (userId: number) => {
  const user = new User()
  if (await user.isUserExists(userId)) {
    const result = await User.findOne({ userId })
    if (result) {
      // eslint-disable-next-line no-unused-vars
      const { password, ...singleUser } = result.toObject()
      return singleUser
    }
  } else {
    throw new Error('User not found in DB!')
  }

  // if (await user.isUserExists(userId)) {
  //   if(result){
  //     const {password,...singleUser} = result.toObject();
  //     return singleUser;
  //   }else{
  //     throw new Error('User not Found in DB!')
  //   }

  // } else {
  //   throw new Error('User not Found in DB!')
  // }
}

const updateUserFromDb = async (userId: number, data: object) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const result = await User.findOneAndUpdate({ userId }, data, { new: true })
    if (result) {
      // eslint-disable-next-line no-unused-vars
      const { password, ...updatedUser } = result.toObject()
      return updatedUser
    }
  } else {
    throw new Error('User not Found in DB!')
  }
}

const deleteUserFromDb = async (userId: number) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const result = await User.deleteOne({ userId })
    return result
  } else {
    throw new Error('User not found in DB!')
  }
}

const addProductIntoDb = async (userId: number, data: object) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const user = await User.findOne({ userId })
    if (user) {
      const result = await User.updateOne(
        { userId },
        { $push: { orders: data } },
      )
      return result
    } else {
      const result = await User.updateOne(
        { userId },
        { $addToSet: { orders: data } },
      )
      return result
    }
  } else {
    throw new Error('User not Found in DB!')
  }
}
const getOrderFromDb = async (userId: number) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      {
        $project: { orders: 1 },
      },
    ])
    return result
  } else {
    throw new Error('User not Found in DB!')
  }
}
const getOrderToalFromDb = async (userId: number) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      {
        $project: {
          totalPrice: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'userorder',
                in: {
                  $multiply: ['$$userorder.price', '$$userorder.quantity'],
                },
              },
            },
          },
        },
      },
    ])
    const totalPrice = result.length > 0 ? result[0].totalPrice : 0

    return { totalPrice }
  } else {
    throw new Error('User not Found in DB!')
  }
}

export const UserServices = {
  createUserIntoDb,
  getUserFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
  deleteUserFromDb,
  addProductIntoDb,
  getOrderFromDb,
  getOrderToalFromDb,
}
