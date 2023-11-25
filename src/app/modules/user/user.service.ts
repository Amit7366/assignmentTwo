import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (user: TUser) =>{
    const result = await User.create(user);
    return result;
}

const getUserFromDb = async () =>{
    const result = await User.aggregate([
        {
            $project: {username: 1, fullName: 1, age: 1, email: 1, address: 1}
        }
    ]);
    return result;
}
const getSingleUserFromDb = async (userId: number) =>{
    const result = await User.findOne({userId})
    return result;
}




export const UserServices = {
    createUserIntoDb,
    getUserFromDb,
    getSingleUserFromDb
}