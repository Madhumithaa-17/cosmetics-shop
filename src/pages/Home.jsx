import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiTruck, FiShield, FiGift, FiArrowRight } from 'react-icons/fi'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import ErrorMessage from '../components/ErrorMessage'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop'

const Home = () => {
  const { products, loading, error } = useProducts()

  const featured = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
  }, [products])

  return (
    <>
    
      <section
        className="hero-banner"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <Container>
          <div className="hero-content">
            <p className="eyebrow">New Season Collection</p>
            <h1>
              Radiance, <br />
              Redefined.
            </h1>
            <p>
              Discover a curated world of luxury skincare, makeup and
              fragrance — crafted with rare ingredients and timeless
              elegance.
            </p>
            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Link to="/products" className="btn-luxury">
                Shop Collection <FiArrowRight className="ms-1" />
              </Link>
              <Link to="/about" className="btn-outline-luxury" style={{ borderColor: '#fff', color: '#fff' }}>
                Our Story
              </Link>
            </div>
          </div>
        </Container>
      </section>

   
      <section className="page-section pb-0">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="value-card">
                <div className="icon-circle"><FiTruck /></div>
                <h5>Free Worldwide Shipping</h5>
                <p className="text-muted mb-0 small">On all orders over ₹4,150, delivered with care.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card">
                <div className="icon-circle"><FiShield /></div>
                <h5>Cruelty-Free Promise</h5>
                <p className="text-muted mb-0 small">Every product is ethically sourced and tested.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="value-card">
                <div className="icon-circle"><FiGift /></div>
                <h5>Gift Wrapping</h5>
                <p className="text-muted mb-0 small">Beautifully packaged, ready to gift instantly.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

   
      <section className="page-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title gold-underline center">Bestsellers</h2>
            <p className="section-subtitle mx-auto">
              Our most-loved formulas, chosen by thousands of beauty
              enthusiasts worldwide.
            </p>
          </div>

          {loading && <ProductGridSkeleton count={8} />}
          {error && !loading && <ErrorMessage message={error} />}

          {!loading && !error && (
            <Row className="g-4">
              {featured.map((product) => (
                <Col key={product.id} xs={6} sm={4} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-5">
            <Link to="/products" className="btn-outline-luxury">
              View All Products
            </Link>
          </div>
        </Container>
      </section>

     
      <section
        className="page-section text-center text-white"
        style={{
          background: 'linear-gradient(135deg, var(--color-pink), var(--color-gold))',
        }}
      >
        <Container>
          <h2 className="text-white">Indulge in Everyday Luxury</h2>
          <p className="mx-auto" style={{ maxWidth: '560px', opacity: 0.9 }}>
            From skincare rituals to signature scents — find everything you
            need to feel beautiful, inside and out.
          </p>
          <Link to="/products" className="btn-luxury btn-luxury-light mt-2">
            Explore Now
          </Link>
        </Container>
      </section>
    </>
  )
}

export default Home
