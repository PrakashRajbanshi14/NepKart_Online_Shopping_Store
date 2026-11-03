import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { APIWITHTOKEN } from '../http'
import type { AppDispatch } from './store'
import { Status } from '../globals/types/type'
export interface AdminStats { users:number; products:number; categories:number; orders:number; revenue:number }
const slice = createSlice({ name:'adminStats', initialState:{ data:null as AdminStats|null, status:Status.LOADING }, reducers:{ setData:(s,a:PayloadAction<AdminStats>)=>{s.data=a.payload;s.status=Status.SUCCESS}, setStatus:(s,a:PayloadAction<Status>)=>{s.status=a.payload} }})
export const {setData,setStatus}=slice.actions
export default slice.reducer
export function fetchAdminStats(){ return async (dispatch:AppDispatch)=>{ try { const r=await APIWITHTOKEN.get('/admin/stats'); dispatch(setData(r.data.data)) } catch { dispatch(setStatus(Status.ERROR)) } } }
