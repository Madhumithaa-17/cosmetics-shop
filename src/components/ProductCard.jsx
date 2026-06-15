import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatINR } from '../utils/currency'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
    : product.price

  return (
    <Card className="product-card fade-in-up">
      <div className="product-img-wrap">
        {hasDiscount && (
          <span className="discount-badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
          />
        </Link>
        <div className="product-actions">
          <button
            className={`product-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            title="Add to wishlist"
          >
            <FiHeart />
          </button>
          <button
            className="product-action-btn"
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      <Card.Body>
        <div className="product-brand">{product.brand || 'Lumière'}</div>
        <Link to={`/products/${product.id}`} className="product-title text-decoration-none">
          {product.title}
        </Link>
        <div className="mt-auto d-flex align-items-center justify-content-between pt-2">
          <div className="product-price">
            {formatINR(discountedPrice)}
            {hasDiscount && <span className="old-price">{formatINR(product.price)}</span>}
          </div>
          <span className="star-rating small">★ {product.rating}</span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
