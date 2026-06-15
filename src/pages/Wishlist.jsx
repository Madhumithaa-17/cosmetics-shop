import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

const Wishlist = () => {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="page-section">
        <Container>
          <div className="empty-state">
            <div className="icon"><FiHeart /></div>
            <h4>Your wishlist is empty</h4>
            <p>Save your favorite products here to shop them later.</p>
            <Link to="/products" className="btn-luxury">Discover Products</Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="page-section">
      <Container>
        <div className="mb-4">
          <h2 className="section-title gold-underline">My Wishlist</h2>
          <p className="section-subtitle">{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
        </div>

        <Row className="g-4">
          {wishlist.map((product) => (
            <Col key={product.id} xs={6} sm={4} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Wishlist
