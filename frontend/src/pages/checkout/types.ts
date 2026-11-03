import { Status } from "../../globals/types/type";
import type { IOrderDetail } from "../my-orders-details/types";

interface IProduct{
    productId : string, 
    productQty : number, 
    orderStatus? : string, 
    totalAmount?:number, 
    Payment? : {
        paymentMethod : PaymentMethod, 
        paymentStatus: string
    }
}
export interface IOrderItems extends IProduct{
    id : string,
    orderId : string
}

export interface IOrder{
    status : Status, 
    items : IOrderItems[], 
    khaltiUrl : string | null,
    orderDetails : IOrderDetail[]
}

export enum PaymentMethod{
    Esewa = "esewa", 
    Khalti = "khalti", 
    Cod = "cod"
}

export interface IData{
    firstName : string, 
    lastName : string, 
    phoneNumber : string, 
    email : string, 
    city : string, 
    zipCode : string, 
    state : string, 
    addressLine : string, 
    totalAmount : number, 
    paymentMethod : PaymentMethod, 
    products : IProduct[]
}
