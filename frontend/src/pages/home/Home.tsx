import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../globals/components/Navbar'
import Card from '../product/components/card'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProducts } from '../../store/productSlice'
import { fetchCategoryItems } from '../../store/adminCategorySlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const categories = useAppSelector((state) => state.categories.items)
  useEffect(() => { dispatch(fetchProducts()); dispatch(fetchCategoryItems()) }, [dispatch])
  return <>
    <Navbar />
    <main>
      <section className="hero-section"><div className="shell hero-content"><div className="hero-copy"><span className="eyebrow">Curated for everyday living</span><h1>Find your next<br /><em>favourite thing.</em></h1><p>Discover thoughtful products, honest prices, and a shopping experience designed around you.</p><div className="hero-actions"><Link to="/products" className="primary-button">Shop the collection <span>↗</span></Link><Link to="/products" className="text-link">Explore all products</Link></div><div className="hero-trust"><span>★ 4.9/5 customer rating</span><span>•</span><span>Fast delivery across Nepal</span></div></div><div className="hero-art"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-product-card"><div className="hero-card-top"><span>Featured today</span><span>01 / 04</span></div><div className="hero-bag">✦</div><h3>Good things,<br />delivered.</h3><span className="hero-card-line" /></div></div></div></section>
      <section className="shell section-block"><div className="section-heading"><div><span className="eyebrow">Browse by mood</span><h2>Shop your way</h2></div><Link to="/products" className="text-link">View all <span>↗</span></Link></div><div className="category-grid">{categories.slice(0, 4).map((category, index) => <Link to={`/products?category=${category.id}`} className={`category-tile tile-${index + 1}`} key={category.id}><span className="category-icon">{['✦', '◌', '⌁', '✿'][index]}</span><strong>{category.categoryName}</strong><small>Explore collection <span>↗</span></small></Link>)}</div></section>
      <section className="shell section-block"><div className="section-heading"><div><span className="eyebrow">Handpicked for you</span><h2>Popular right now</h2></div><Link to="/products" className="text-link">See all products <span>↗</span></Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <Card key={product.id} product={product} />)}</div></section>
      <section className="shell promise-strip"><div><span className="eyebrow">The SastoPasal promise</span><h2>Simple shopping.<br /><em>Beautifully done.</em></h2></div><div className="promise-items"><div><b>01</b><strong>Quality first</strong><p>Products selected with care and built to last.</p></div><div><b>02</b><strong>Fair prices</strong><p>Great value without the complicated markup.</p></div><div><b>03</b><strong>Here to help</strong><p>Friendly support whenever you need us.</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell footer-inner"><div><div className="brand footer-brand"><span className="brand-mark">S</span> SastoPasal</div><p>Your everyday marketplace for better finds.</p></div><div className="footer-links"><Link to="/products">Shop</Link><Link to="/my-orders">Orders</Link><Link to="/login">Account</Link></div><small>© 2026 SastoPasal</small></div></footer>
  </>
}
