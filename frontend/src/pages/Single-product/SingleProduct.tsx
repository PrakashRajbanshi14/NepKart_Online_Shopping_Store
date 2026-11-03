import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../globals/components/Navbar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProduct } from '../../store/productSlice'
import { addToCart } from '../../store/cartSlice'

export default function SingleProduct() {
  const { id } = useParams(); const navigate = useNavigate(); const dispatch = useAppDispatch(); const product = useAppSelector((state) => state.products.product)
  useEffect(() => { if (id) dispatch(fetchProduct(id)) }, [id, dispatch])
  if (!product) return <><Navbar /><main className="shell empty-state"><p>Loading product…</p></main></>
  const addProductToCart = () => dispatch(addToCart(product.id))
  const buyNow = async () => { await dispatch(addToCart(product.id)); navigate('/my-checkout') }
  return <><Navbar /><main className="shell detail-page"><Link to="/products" className="text-link">← Back to collection</Link><div className="detail-grid"><div className="detail-image"><img src={`http://localhost:3000/${product.productImageUrl}`} alt={product.productName} /></div><div className="detail-copy"><span className="eyebrow">{product.Category?.categoryName}</span><h1>{product.productName}</h1><div className="detail-price">Rs. {product.productPrice.toLocaleString()}</div><p>{product.productDescription}</p><div className="detail-stock"><span className="stock-dot" /> {product.productTotalStock > 0 ? `${product.productTotalStock} in stock` : 'Out of stock'}</div><div className="detail-actions"><button className="primary-button detail-cta" disabled={!product.productTotalStock} onClick={addProductToCart}>Add to cart <span>↗</span></button><button className="secondary-button detail-cta" disabled={!product.productTotalStock} onClick={buyNow}>Buy now</button></div><div className="detail-notes"><div><b>↺</b><span>Easy returns<br /><small>Hassle-free support</small></span></div><div><b>⌁</b><span>Local delivery<br /><small>Across Nepal</small></span></div></div></div></div></main></>
}
