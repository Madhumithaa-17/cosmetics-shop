import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'
import { formatINR, USD_TO_INR } from '../utils/currency'


const FREE_SHIPPING_THRESHOLD_USD = 50
const SHIPPING_FEE_USD = 5.99

const Cart = () => {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="page-section">
        <Container>
          <div className="empty-state">
            <div className="icon"><FiShoppingBag /></div>
            <h4>Your cart is empty</h4>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn-luxury">Start Shopping</Link>
          </div>
        </Container>
      </div>
    )
  }

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD_USD ? 0 : SHIPPING_FEE_USD
  const grandTotal = cartTotal + shipping

 
  const handleCheckout = () => {
    toast.success('Order placed successfully! 🎉')
    clearCart()
  }

  return (
    <div className="page-section">
      <Container>
        <div className="mb-4">
          <h2 className="section-title gold-underline">Shopping Cart</h2>
          <p className="section-subtitle">{cart.length} item{cart.length > 1 ? 's' : ''} in your bag</p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div className="cart-item d-flex align-items-center gap-3 flex-wrap" key={item.id}>
                  <img src={item.thumbnail || item.images?.[0]} alt={item.title} />
                  <div className="flex-grow-1">
                    <div className="product-brand">{item.brand || 'Lumière'}</div>
                    <Link to={`/products/${item.id}`} className="product-title d-block text-decoration-none">
                      {item.title}
                    </Link>
                    <div className="product-price">{formatINR(item.price)}</div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="fw-bold" style={{ minWidth: '90px', textAlign: 'right', color: 'var(--color-pink)' }}>
                    {formatINR(item.price * item.qty)}
                  </div>
                  <button className="qty-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button className="btn-outline-luxury" onClick={clearCart}>Clear Cart</button>
            </div>
          </Col>

         
          <Col lg={4}>
            <div className="filter-card">
              <h4 className="mb-3">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <hr style={{ borderColor: 'var(--color-border)' }} />
              <div className="d-flex justify-content-between mb-3 fw-bold" style={{ fontSize: '1.2rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-pink)' }}>{formatINR(grandTotal)}</span>
              </div>
              <button className="btn-luxury w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleCheckout}>
                Checkout <FiArrowRight />
              </button>
              <p className="small text-muted mt-3 mb-0 text-center">
                Free shipping on orders over {formatINR(FREE_SHIPPING_THRESHOLD_USD)}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart
