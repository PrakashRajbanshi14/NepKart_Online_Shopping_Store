import express from 'express'
import errorHandler from '../services/errorHandler'
import userMiddleware, { Role } from '../middleware/userMiddleware'
import adminController from '../controllers/adminController'

const router = express.Router()
router.get('/stats', userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler(adminController.stats))
export default router
