import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()


router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId',UserController.getSingleUser);
router.put('/:userId',UserController.updateUser);
router.delete('/:userId',UserController.deleteStudent);


router.put('/:userId/orders',UserController.addProduct);
router.get('/:userId/orders', UserController.getUserOrder);
router.get('/:userId/orders/total-price', UserController.getTotalPrice);





export const UserRoutes = router;
