import React, { useState } from 'react'
import { Container, Navbar, Nav, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiSun, FiMoon } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'

const AppNavbar = () => {
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { theme, toggleTheme } = useTheme()
  const [expanded, setExpanded] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `nav-link-luxury${isActive ? ' active' : ''}`

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="navbar-luxury"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-luxury" onClick={() => setExpanded(false)}>
          PrimePick
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto my-2 my-lg-0 text-center">
            <NavLink to="/" end className={navLinkClass} onClick={() => setExpanded(false)}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass} onClick={() => setExpanded(false)}>Products</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setExpanded(false)}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setExpanded(false)}>Contact</NavLink>
          </Nav>

          <div className="d-flex align-items-center justify-content-center gap-3 mb-2 mb-lg-0">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
              <span className="toggle-knob">
                {theme === 'light' ? <FiSun size={11} /> : <FiMoon size={11} />}
              </span>
            </button>

            <NavLink to="/wishlist" className="icon-btn" onClick={() => setExpanded(false)} aria-label="Wishlist">
              <FiHeart />
              {wishlist.length > 0 && <Badge className="badge-count">{wishlist.length}</Badge>}
            </NavLink>

            <NavLink to="/cart" className="icon-btn" onClick={() => setExpanded(false)} aria-label="Cart">
              <FiShoppingBag />
              {cartCount > 0 && <Badge className="badge-count">{cartCount}</Badge>}
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
