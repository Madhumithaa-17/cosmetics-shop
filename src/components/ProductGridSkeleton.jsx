import React from 'react'
import { Row, Col } from 'react-bootstrap'

const ProductCardSkeleton = () => (
  <div className="product-card">
    <div className="skeleton skeleton-img" />
    <div className="p-3">
      <div className="skeleton skeleton-line" style={{ width: '40%' }} />
      <div className="skeleton skeleton-line" style={{ width: '80%' }} />
      <div className="skeleton skeleton-line" style={{ width: '50%' }} />
    </div>
  </div>
)


const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <Row className="g-4">
      {Array.from({ length: count }).map((_, i) => (
        <Col key={i} xs={6} sm={4} md={4} lg={3}>
          <ProductCardSkeleton />
        </Col>
      ))}
    </Row>
  )
}

export default ProductGridSkeleton
