import { useEffect, useMemo, useState } from 'react'
import Navbar from '../../globals/components/Navbar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Card from './components/card'
import { fetchProducts } from '../../store/productSlice'

export default function Product() {
  const dispatch = useAppDispatch(); const { products } = useAppSelector((state) => state.products)
  const [search, setSearch] = useState(''); const [category, setCategory] = useState('all')
  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])
  const categories = useMemo(() => [...new Set(products.map((item) => item.Category?.categoryName).filter(Boolean))], [products])
  const visible = products.filter((item) => item.productName.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || item.Category?.categoryName === category))
  return <><Navbar /><main className="shell shop-page"><div className="shop-intro"><div><span className="eyebrow">The collection</span><h1>Good things,<br /><em>well chosen.</em></h1></div><p>Explore our latest finds, selected for quality, usefulness, and a little bit of joy.</p></div><div className="shop-toolbar"><div className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" /></div><div className="category-pills"><button className={category === 'all' ? 'selected' : ''} onClick={() => setCategory('all')}>All</button>{categories.map((item) => <button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div><div className="shop-grid">{visible.map((product) => <Card key={product.id} product={product} />)}</div>{visible.length === 0 && <div className="empty-state"><span>✦</span><h3>No products found</h3><p>Try a different search or category.</p></div>}</main></>
}
