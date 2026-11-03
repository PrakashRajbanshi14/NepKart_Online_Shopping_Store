import express, { Router } from 'express'
import productController from '../controllers/productController'
import userMiddleware, { Role } from '../middleware/userMiddleware'
import {multer, storage} from "../middleware/multerMiddleware"
import errorHandler from '../services/errorHandler'
const upload = multer({storage: storage})
const router:Router = express.Router()

router.route("/")
    .get( errorHandler(productController.getAllProducts))
    .post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin),upload.single('productImage'), errorHandler(productController.createProduct))

router.route("/:id")
    .get(errorHandler(productController.getSingleProduct))
    .put(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), upload.single('productImage'), errorHandler(productController.updateProduct))
    .delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler(productController.deleteProduct))

export default router 