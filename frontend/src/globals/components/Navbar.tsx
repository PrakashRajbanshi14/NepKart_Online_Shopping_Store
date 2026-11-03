import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchCartItems } from '../../store/cartSlice'
import { logoutUser } from '../../store/authSlice'

export default function Navbar() {
  const location = useLocation(); const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.user.token) || localStorage.getItem('token')
  const role = useAppSelector((state) => state.auth.user.role)
  const items = useAppSelector((state) => state.cart.items)
  const [menu, setMenu] = useState(false)
  useEffect(() => { if (token && role !== 'admin') dispatch(fetchCartItems()) }, [token, role, dispatch])
  const logout = () => { dispatch(logoutUser()); setMenu(false) }
  return <header className="site-nav"><div className="shell nav-inner"><Link to="/" className="brand"><span className="brand-mark">S</span><span>Sasto</span>Pasal</Link><button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button><nav className={`nav-links ${menu ? 'open' : ''}`}><Link className={location.pathname === '/' ? 'active' : ''} to="/">Home</Link><Link className={location.pathname.startsWith('/products') ? 'active' : ''} to="/products">Shop</Link>{token && role !== 'admin' && <Link to="/my-orders">Orders</Link>}{role === 'admin' && <Link to="/admin">Dashboard</Link>}<div className="nav-mobile-actions">{token ? <button onClick={logout}>Sign out</button> : <Link to="/login">Sign in</Link>}</div></nav><div className="nav-actions"><Link to={token && role !== 'admin' ? '/my-cart' : '/login'} className="cart-link" aria-label="Cart">Cart <b>{token && role !== 'admin' ? items.length : 0}</b></Link>{token ? <button className="nav-signout" onClick={logout}>Sign out</button> : <Link className="nav-login" to="/login">Sign in <span>↗</span></Link>}</div></div></header>
}
