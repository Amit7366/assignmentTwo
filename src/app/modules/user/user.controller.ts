import { Request, Response } from "express";
import { UserServices } from "./user.service";



const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const result = await UserServices.createUserIntoDb(user);


        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            error: err,
        });
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getUserFromDb()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
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

const getSingleUser = async (req: Request, res: Response) => {


    try {
        const userId = parseInt(req.params.userId);
        const result = await UserServices.getSingleUserFromDb(userId)
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message || "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const data = req.body;
        const result = await UserServices.updateUserFromDb(userId, data)
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message || "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
}

export const UserController = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser
}