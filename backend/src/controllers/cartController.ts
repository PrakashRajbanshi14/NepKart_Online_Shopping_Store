import {  Request, Response } from "express";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";


interface AuthRequest extends Request{
    user? : {
        id : string
    }
}


class CartController{
    async addToCart(req : AuthRequest, res : Response):Promise<void>{
        const userId = req.user?.id
        const {productId, quantity} = req.body;
        if(!productId || !quantity){
            res.status(400).json({
                message : "some fields are missing!"
            })
            return
        }
        // check if that productId exists - if exists increse qty only else insert product
        let productAlreadyExistsOnCart = await Cart.findOne({
            where : {
                productId,
                userId
            }
        })
        if(productAlreadyExistsOnCart){
            productAlreadyExistsOnCart.quantity += quantity
            await productAlreadyExistsOnCart.save()
        }else {
            await Cart.create({
                productId,
                userId,
                quantity
            })
        }
        const cartData = await Cart.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Product,
                    include: [
                        {
                            model: Category
                        }
                    ]
                }
            ]
        })
        res.status(200).json({
            message : "Product added to cart",
            data : cartData
        })
    }

    async getMyCartItems(req: AuthRequest, res : Response){
        const userId = req.user?.id
        const cartItems = await Cart.findAll({
            where : {
                userId
            },
            // join Product details to cart
            include : [
                {
                    model : Product,
                    attributes : ["id", "productName", "productPrice", "productImageUrl"]
                }
            ]
        })
        res.status(200).json({
            message : cartItems.length ? "Cart Items fetched succesfully" : "Cart is empty",
            data : cartItems
        })
    }

    async deleteMyCartItem(req : AuthRequest, res: Response):Promise<void>{
        const userId = req.user?.id
        const {productId} = req.params
        const cartItem = await Cart.findOne({
            where : {
                productId,
                userId
            }
        })
        if(!cartItem){
            res.status(404).json({
                message : "No Product with that Id in cart"
            })
            return
        }
        await cartItem.destroy()
        res.status(200).json({
            message : "Product from cart deleted successfully!"
        })
    }

    async updateCartItem(req: AuthRequest, res : Response):Promise<void>{
        const userId = req.user?.id
        const {productId} = req.params
        const{quantity} = req.body
        if(!quantity){
            res.status(400).json({
                message: "Please Provide Quantity!"
            })
            return
        }
        const cartItem = await Cart.findOne({
            where : {
                userId,
                productId
            }
        })
        if(!cartItem){
            res.status(404).json({
                message : "Product with that productId on Cart doesnt exists"
            })
        }else{
            cartItem.quantity = quantity;
            await cartItem.save()
            res.status(200).json({
                message : "cart Updated!"
            })
        }
    }
}

export default new CartController
