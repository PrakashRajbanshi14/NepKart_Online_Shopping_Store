import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import {API} from "../http";

interface IUser{
    id?: string | null,
    username : string | null,
    email: string | null,
    password : string | null,
    role?: string | null,
    token?: string | null
}

interface ILoginUser{
    email : string,
    password: string
}

interface IAuthState{
    user: IUser,
    status : Status
}

const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
const parsedUser = storedUser ? JSON.parse(storedUser) : null

const initialState:IAuthState = {
        user : parsedUser || {
        id: null,
        username: null,
        email: null,
        password: null,
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null
    },
    status : Status.LOADING
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser(state:IAuthState, action:PayloadAction<IUser>){
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setStatus(state:IAuthState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        resetStatus(state:IAuthState){
            state.status = Status.LOADING
        },
        setToken(state:IAuthState, action:PayloadAction<string>){
            state.user.token = action.payload
        }
    }
})


export const {setStatus, setUser, resetStatus, setToken} = authSlice.actions
export default authSlice.reducer

export function logoutUser(){
    return async function logoutUserThunk(dispatch: AppDispatch){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setUser({username:null,email:null,password:null,token:null,id:null}))
        dispatch(setStatus(Status.SUCCESS))
    }
}

export function registerUser(data:IUser){
    return async function registerUserThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/auth/register",data)
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUser(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function loginUser(data:ILoginUser){
    return async function loginUserThunk(dispatch:AppDispatch){
        try {
             const response = await API.post("/auth/login",data)
             const tokenData = response.data.token
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                if(response.data.token){
                    localStorage.setItem("token", tokenData)
                    dispatch(setToken(tokenData))
                    dispatch(setUser({ ...response.data.user, token: tokenData, password: null }))
                }else{
                    dispatch(setStatus(Status.ERROR))
                }
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function forgotPassword(data:{email: string}){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
         try {
            const response = await API.post("/auth/forgot-password",data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function verifyOtp(data:{email:string; otp:string}){
    return async function verifyOtpThunk(dispatch:AppDispatch){
        try { await API.post('/auth/verify-otp', data); dispatch(setStatus(Status.SUCCESS)) }
        catch { dispatch(setStatus(Status.ERROR)) }
    }
}

export function resetPassword(data:{email:string; otp:string; newPassword:string; confirmPassword:string}){
    return async function resetPasswordThunk(dispatch:AppDispatch){
        try { await API.post('/auth/reset-password', data); dispatch(setStatus(Status.SUCCESS)) }
        catch { dispatch(setStatus(Status.ERROR)) }
    }
}
