import express, { Router } from 'express'
import userMiddleware, { Role } from '../middleware/userMiddleware'
import errorHandler from '../services/errorHandler'
import cartController from '../controllers/cartController'
const router:Router = express.Router()

router.route("/")
    .post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(cartController.addToCart))
    .get(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(cartController.getMyCartItems))

router.route("/:productId")
    .patch(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(cartController.updateCartItem))
    .delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Customer), errorHandler(cartController.deleteMyCartItem))

export default router