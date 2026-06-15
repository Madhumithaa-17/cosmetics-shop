import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FiFeather, FiHeart, FiGlobe, FiAward } from 'react-icons/fi'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop'

const About = () => {
  return (
    <div className="page-section">
      <Container>
        <Row className="align-items-center g-5 mb-5">
          <Col md={6}>
            <p className="eyebrow text-uppercase fw-semibold" style={{ color: 'var(--color-gold)', letterSpacing: '2px' }}>
              Our Story
            </p>
            <h1 className="font-display gold-underline mb-3">
              Beauty, Crafted with Intention
            </h1>
            <p className="text-muted">
              PrimePick Beauty was founded on a simple belief: that skincare and
              cosmetics should feel like a ritual, not a routine. We work
              with artisans and ethical labs around the world to bring you
              formulas that combine rare botanicals, modern science and
              timeless elegance.
            </p>
            <p className="text-muted">
              Every product in our collection is cruelty-free, thoughtfully
              packaged, and designed to make you feel confident in your own
              skin — because true luxury is feeling beautiful, inside and
              out.
            </p>
          </Col>
          <Col md={6}>
            <img
              src={ABOUT_IMAGE}
              alt="Lumière Beauty products"
              className="about-image"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)' }}
            />
          </Col>
        </Row>

      
        <div className="text-center mb-4">
          <h2 className="section-title gold-underline center">What We Stand For</h2>
        </div>
        <Row className="g-4">
          <Col sm={6} lg={3}>
            <div className="value-card">
              <div className="icon-circle"><FiFeather /></div>
              <h5>Clean Formulas</h5>
              <p className="text-muted small mb-0">Free from harsh chemicals, made with nourishing ingredients.</p>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="value-card">
              <div className="icon-circle"><FiHeart /></div>
              <h5>Cruelty-Free</h5>
              <p className="text-muted small mb-0">Never tested on animals — always kind to the planet.</p>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="value-card">
              <div className="icon-circle"><FiGlobe /></div>
              <h5>Sustainably Sourced</h5>
              <p className="text-muted small mb-0">Responsibly harvested ingredients from trusted partners.</p>
            </div>
          </Col>
          <Col sm={6} lg={3}>
            <div className="value-card">
              <div className="icon-circle"><FiAward /></div>
              <h5>Award-Winning</h5>
              <p className="text-muted small mb-0">Recognized by beauty experts and loved by our community.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About
