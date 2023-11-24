import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()


router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);


export const UserRoutes = router;
