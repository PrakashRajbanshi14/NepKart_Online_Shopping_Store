import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeAdminOrderStatus, changeAdminPaymentStatus, fetchAdminOrderDetails } from '../../../store/adminOrderSlice'

const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'preparation', label: 'Preparing' },
  { value: 'ontheway', label: 'On the way' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function AdminOrderDetails() {
  const { id } = useParams(); const dispatch = useAppDispatch()
  const { orderDetails, status } = useAppSelector((state) => state.adminOrders)
  const [saving, setSaving] = useState<'order' | 'payment' | null>(null)
  const detail = orderDetails[0]; const order = detail?.Order
  useEffect(() => { if (id) dispatch(fetchAdminOrderDetails(id)) }, [dispatch, id])
  const updateOrder = async (value: string) => { if (!id) return; setSaving('order'); await dispatch(changeAdminOrderStatus(id, value)); setSaving(null) }
  const updatePayment = async (value: string) => { if (!id) return; setSaving('payment'); await dispatch(changeAdminPaymentStatus(id, value)); setSaving(null) }
  if (status === 'loading' && !detail) return <AdminLayout><div className="admin-empty">Loading order details…</div></AdminLayout>
  if (!detail || !order) return <AdminLayout><div className="admin-empty"><h2>Order not found</h2><p>This order may have been removed or has no line items.</p><Link to="/admin/orders" className="primary-button">Back to orders</Link></div></AdminLayout>
  return <AdminLayout><main className="admin-order-page"><div className="admin-page-top"><div><Link to="/admin/orders" className="admin-back">← All orders</Link><span className="eyebrow">Order details</span><h1>#{detail.orderId}</h1><p>Placed {new Date(detail.createdAt).toLocaleDateString()}</p></div><div className={`status-pill status-${String(order.orderStatus).toLowerCase()}`}>{order.orderStatus}</div></div><div className="admin-order-layout"><section className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">Items</span><h2>Order contents</h2></div><span>{orderDetails.length} item{orderDetails.length === 1 ? '' : 's'}</span></div>{orderDetails.map((item) => <div className="admin-order-item" key={item.id}><img src={`http://localhost:3000/${item.Product?.productImageUrl}`} alt={item.Product?.productName} /><div className="admin-item-copy"><small>{item.Product?.Category?.categoryName || 'Product'}</small><h3>{item.Product?.productName}</h3><p>Quantity: {item.quantity}</p></div><strong>Rs. {(item.quantity * item.Product.productPrice).toLocaleString()}</strong></div>)}<div className="admin-total"><span>Total paid</span><strong>Rs. {Number(order.totalAmount).toLocaleString()}</strong></div></section><aside className="admin-side-column"><section className="admin-panel control-panel"><div className="panel-heading"><div><span className="eyebrow">Fulfilment</span><h2>Update status</h2></div></div><label>Order status<select value={order.orderStatus} onChange={(e) => updateOrder(e.target.value)} disabled={saving !== null}>{orderStatuses.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>Payment status<select value={order.Payment?.paymentStatus || 'unpaid'} onChange={(e) => updatePayment(e.target.value)} disabled={saving !== null}><option value="unpaid">Unpaid</option><option value="Paid">Paid</option></select></label>{saving && <small className="saving-note">Saving {saving} status…</small>}</section><section className="admin-panel customer-panel"><span className="eyebrow">Customer</span><h2>{order.firstName} {order.lastName}</h2><p>{order.phoneNumber}</p><p>{order.addressLine}, {order.city}, {order.state}</p><a href={`mailto:${order.email}`}>{order.email}</a></section></aside></div></main></AdminLayout>
}
