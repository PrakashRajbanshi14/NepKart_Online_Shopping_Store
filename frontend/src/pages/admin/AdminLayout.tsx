import Sidebar from "./components/sidebar/Sidebar"




function AdminLayout({children}:Readonly<{children : React.ReactNode}>){
    return ( 
<div className="admin-shell">
  {/* sidebar */}
  <div className="admin-sidebar hidden md:flex">
    <div className="admin-logo">
      <span className="brand-mark">S</span><span>SastoPasal</span>
    </div>
 <Sidebar />
  </div>
  {/* Main content */}
  <div className="admin-main">
    <div className="admin-topbar">
      <div><span className="eyebrow">Workspace</span><strong>Store management</strong></div>
      <div className="admin-live"><span /> Live system</div>
    </div>
    <div className="admin-content">
    {children}
    </div>
  </div>
</div>

    )
}

export default AdminLayout
