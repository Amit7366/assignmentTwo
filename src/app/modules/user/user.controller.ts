import { Request, Response } from "express";
import { UserServices } from "./user.service";



const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const result = await UserServices.createUserIntoDb(user);


        res.status(200).json({
            success: true,
            message: "User is created successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err,
        });
    }
}

const getUsers= async(req: Request,res: Response)=>{
    try{
        
    }
}

export const UserController = {
    createUser,
    getUsers
}