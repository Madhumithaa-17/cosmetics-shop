import React, { useEffect, useMemo, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { FiFilter } from 'react-icons/fi'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import ErrorMessage from '../components/ErrorMessage'

const Products = () => {
  const { products, loading, error } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')


  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setSearch(urlSearch)
  }, [searchParams])


  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category))
    return ['all', ...Array.from(unique).sort()]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [products, search, category, sort])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    if (value) {
      setSearchParams({ search: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="page-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title gold-underline center">Shop All Products</h2>
          <p className="section-subtitle mx-auto">
            Explore our full range of skincare, makeup and fragrance —
            curated for every beauty ritual.
          </p>
        </div>

        
        <div className="filter-card mb-4">
          <Row className="g-3 align-items-center">
            <Col xs={12} md={5}>
              <Form.Control
                type="search"
                placeholder="Search by name, brand or category..."
                className="form-control-luxury"
                value={search}
                onChange={handleSearchChange}
              />
            </Col>
            <Col xs={6} md={3}>
              <Form.Select
                className="form-select-luxury"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all'
                      ? 'All Categories'
                      : cat.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6} md={3}>
              <Form.Select
                className="form-select-luxury"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A-Z</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={1} className="text-md-end text-muted small">
              <FiFilter className="me-1" />
              {filteredProducts.length}
            </Col>
          </Row>
        </div>

       
        {loading && <ProductGridSkeleton count={12} />}
        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h4>No products found</h4>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={6} sm={4} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Products
