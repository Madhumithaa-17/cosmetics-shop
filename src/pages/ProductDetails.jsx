import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Badge, Form } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiArrowLeft, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { formatINR } from '../utils/currency'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    let isMounted = true
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) throw new Error('Product not found')
        const data = await res.json()
        if (isMounted) {
          setProduct(data)
          setActiveImage(0)
          setQty(1)
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load product')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchProduct()
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) return <LoadingSpinner text="Loading product details..." />
  if (error || !product) return <ErrorMessage message={error || 'Product not found'} />

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
    : product.price

  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <div className="page-section">
      <Container>
        <Link to="/products" className="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none nav-link-luxury">
          <FiArrowLeft /> Back to Products
        </Link>

        <Row className="g-5">
          
          <Col md={6}>
            <div className="product-img-wrap product-detail-img mb-3" style={{ borderRadius: 'var(--radius-lg)' }}>
              <img src={images[activeImage]} alt={product.title} />
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: activeImage === idx ? '2px solid var(--color-pink)' : '2px solid var(--color-border)',
                    transition: 'var(--transition)',
                  }}
                />
              ))}
            </div>
          </Col>

         
          <Col md={6}>
            <div className="product-brand mb-1">{product.brand || 'Lumière'}</div>
            <h1 className="font-display mb-2" style={{ fontSize: '2rem' }}>{product.title}</h1>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="star-rating">★ {product.rating}</span>
              <Badge bg="" style={{ background: 'var(--color-pink-soft)', color: 'var(--color-pink)' }}>
                {product.category?.replace('-', ' ')}
              </Badge>
              {product.stock > 0 ? (
                <Badge bg="" style={{ background: '#e6f4ea', color: '#2e7d32' }}>In Stock</Badge>
              ) : (
                <Badge bg="" style={{ background: '#fdecea', color: '#c62828' }}>Out of Stock</Badge>
              )}
            </div>

            <div className="product-price mb-3" style={{ fontSize: '1.8rem' }}>
              {formatINR(discountedPrice)}
              {hasDiscount && <span className="old-price">{formatINR(product.price)}</span>}
              {hasDiscount && (
                <span className="discount-badge ms-2" style={{ position: 'static' }}>
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            <p className="text-muted">{product.description}</p>

            <Row className="g-3 my-3">
              <Col xs={4} className="text-center">
                <div className="contact-info-card py-3">
                  <FiTruck size={20} className="mb-2" style={{ color: 'var(--color-pink)' }} />
                  <div className="small">Free Shipping</div>
                </div>
              </Col>
              <Col xs={4} className="text-center">
                <div className="contact-info-card py-3">
                  <FiRefreshCw size={20} className="mb-2" style={{ color: 'var(--color-pink)' }} />
                  <div className="small">Easy Returns</div>
                </div>
              </Col>
              <Col xs={4} className="text-center">
                <div className="contact-info-card py-3">
                  <FiShield size={20} className="mb-2" style={{ color: 'var(--color-pink)' }} />
                  <div className="small">Authentic</div>
                </div>
              </Col>
            </Row>

          
            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <Form.Control
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="form-control-luxury text-center"
                  style={{ width: '70px' }}
                />
                <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>

              <button className="btn-luxury d-flex align-items-center gap-2" onClick={() => addToCart(product, qty)}>
                <FiShoppingBag /> Add to Cart
              </button>

              <button
                className={`btn-outline-luxury d-flex align-items-center gap-2 ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FiHeart fill={isInWishlist(product.id) ? 'var(--color-pink)' : 'none'} />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
              </button>
            </div>

            <div className="small text-muted">
              <strong>SKU:</strong> {product.sku || product.id} &nbsp;|&nbsp;
              <strong> Availability:</strong> {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductDetails
