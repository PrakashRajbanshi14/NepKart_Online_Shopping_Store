import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import { Status } from "../globals/types/type";
import {type AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import  {type IOrderDetail, OrderStatus  } from "../pages/my-orders-details/types";

const initialState:IOrder = {
    status : Status.LOADING, 
    items : [], 
    khaltiUrl : null,
    orderDetails: []
}

const orderSlice = createSlice({
    name : "orders", 
    initialState, 
    reducers : {
        setItems(state:IOrder, action:PayloadAction<IOrderItems[]>){
            state.items = action.payload
        }, 
        setStatus(state:IOrder,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setKhaltiUrl(state:IOrder,action:PayloadAction<string>){
            state.khaltiUrl = action.payload
        }, 
        setOrderDetails(state:IOrder, action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        },
        updateOrderStatusinSlice(state:IOrder,action:PayloadAction<{status:OrderStatus,userId:string,orderId:string}>){
            const {status,orderId} = action.payload 
            const updateOrder = state.items.map((order)=>order.id == orderId  ? {...order,orderStatus : status} : order)
            console.log(updateOrder,"UO")
            state.items = updateOrder
            
        },
     
        updateOrderStatusToCancel(state:IOrder, action: PayloadAction<{orderId:string}>){
            const orderId = action.payload.orderId
            // state.items.map((item)=>item.)
            // console.log(state.items,"ST")
            // const data =  state.orderDetails.map((order)=>order.orderId == orderId ? {...order, [order.Order.orderStatus] : OrderStatus.Cancelled} : order)
            const datas = state.orderDetails.find((order)=>order.orderId === orderId)
            datas ? datas.Order.orderStatus = OrderStatus.Cancelled : ""
            // state.orderDetails = data
           
        }
    }
})

export default orderSlice.reducer
export const {setItems,setStatus,setKhaltiUrl, setOrderDetails,updateOrderStatusinSlice, updateOrderStatusToCancel} = orderSlice.actions

export function orderItem(data:IData){
    return async function orderItemThunk(dispatch:AppDispatch){
        try {
           const response =  await APIWITHTOKEN.post("/order",data)
           if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            if (Array.isArray(response.data.data)) dispatch(setItems(response.data.data))
            const khaltiUrl = response.data.payment_url || response.data.url || response.data.payment?.payment_url || response.data.payment?.url
            // const khaltiPidx = response.data.pidx || response.data.payment?.pidx
            if(khaltiUrl){
                dispatch(setKhaltiUrl(khaltiUrl))
            }
           }else{
            dispatch(setStatus(Status.ERROR))
           }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function fetchMyOrders(){
    return async function fetchMyOrdersThunk(dispatch:AppDispatch){
        try {
            const response =  await APIWITHTOKEN.get("/order")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(Array.isArray(response.data.data) ? response.data.data : []))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function fetchMyOrderDetails(id:string){
    return async function fetchMyOrderDetailsThunk(dispatch:AppDispatch){
        try {
            const response =  await APIWITHTOKEN.get("/order/" +id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setOrderDetails(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))

        }
    }
}



export function cancelOrderAPI(id:string){
    return async function cancelOrderAPIThunk(dispatch:AppDispatch){
        try {
            const response =  await APIWITHTOKEN.patch("/order/cancel-order/" +id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(updateOrderStatusToCancel({orderId : id}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}
