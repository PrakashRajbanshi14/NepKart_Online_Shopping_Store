import { Link } from 'react-router-dom'
import type { IProduct } from '../types'

export default function Card({ product }: { product: IProduct }) {
  return <Link className="product-card" to={`/products/${product.id}`}><div className="product-image-wrap"><img src={`http://localhost:3000/${product.productImageUrl}`} alt={product.productName} /><span className="product-arrow">↗</span></div><div className="product-info"><small>{product.Category?.categoryName || 'Collection'}</small><h3>{product.productName}</h3><div className="product-price"><strong>Rs. {product.productPrice.toLocaleString()}</strong>{product.discount > 0 && <del>Rs. {product.discount.toLocaleString()}</del>}</div></div></Link>
}
