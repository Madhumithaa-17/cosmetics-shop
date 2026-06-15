import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="page-section">
    <Container className="text-center">
      <h1 className="font-display" style={{ fontSize: '5rem', color: 'var(--color-pink)' }}>404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-luxury">Back to Home</Link>
    </Container>
  </div>
)

export default NotFound
