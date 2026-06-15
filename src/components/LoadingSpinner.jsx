import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <Spinner animation="border" style={{ color: 'var(--color-pink)', width: '3rem', height: '3rem' }} />
    <p className="mt-3 text-muted">{text}</p>
  </div>
)

export default LoadingSpinner
