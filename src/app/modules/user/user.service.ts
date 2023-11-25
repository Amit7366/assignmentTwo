import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user)
  return result
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
    return result
  } else {
    throw new Error('User not Found in DB!')
  }
}

const updateUserFromDb = async (userId: number, data: object) => {
  const user = new User()

  if (await user.isUserExists(userId)) {
    const result = await User.updateOne({ userId }, data)
    return result
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
    throw new Error('User not Found in DB!')
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
    return result
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
