import AdminLayout from "../AdminLayout"
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchAdminStats } from '../../../store/adminStatsSlice'


function AdminStats(){
    const dispatch=useAppDispatch(); const {data}=useAppSelector(s=>s.adminStats)
    useEffect(()=>{dispatch(fetchAdminStats())},[dispatch])
    return (
        <AdminLayout>
            <div className="admin-heading"><div><div className="eyebrow">Overview</div><h1>Good morning, Admin</h1><p>Here’s what is happening across your store today.</p></div></div>
            <div className="stats-grid">{[['Customers',data?.users||0,'#2563eb'],['Products',data?.products||0,'#7c3aed'],['Orders',data?.orders||0,'#ea580c'],['Revenue',`$${(data?.revenue||0).toLocaleString()}`,'#059669']].map(([label,value,color])=><div className="stat-card" key={String(label)}><span style={{color:String(color)}}>{label}</span><strong>{value}</strong><small>Live from your database</small></div>)}</div>
        </AdminLayout>
    )
}

export default AdminStats
