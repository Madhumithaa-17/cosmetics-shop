import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-luxury">
      <span className="footer-brand">PrimePick Beauty</span>
      <p className="mb-0 mt-1">
        © {new Date().getFullYear()} PrimePick Beauty. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
