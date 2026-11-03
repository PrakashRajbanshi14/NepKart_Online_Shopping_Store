import { Request, Response } from 'express'
import User from '../database/models/userModel'
import Product from '../database/models/productModel'
import Category from '../database/models/categoryModel'
import Order from '../database/models/orderModel'

class AdminController {
  async stats(_req: Request, res: Response) {
    const [users, products, categories, orders, revenue] = await Promise.all([
      User.count(), Product.count(), Category.count(), Order.count(),
      Order.sum('totalAmount')
    ])
    res.status(200).json({ data: { users, products, categories, orders, revenue: Number(revenue || 0) } })
  }
}

export default new AdminController()
