import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

const ErrorMessage = ({ message = 'Something went wrong. Please try again.', onRetry }) => (
  <div className="empty-state">
    <div className="icon"><FiAlertTriangle /></div>
    <h4>Oops!</h4>
    <p>{message}</p>
    {onRetry && (
      <button className="btn-luxury" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
)

export default ErrorMessage
