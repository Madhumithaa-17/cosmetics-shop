import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'


const WEB3FORMS_ACCESS_KEY = 'a986eb77-2f39-411f-a6e2-9e1b1b9f1f67'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New message from PrimePick Beauty website',
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await res.json()

      if (result.success) {
        toast.success("Message sent! We'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title gold-underline center">Get In Touch</h2>
          <p className="section-subtitle mx-auto">
            Have a question about our products or your order? We'd love to
            hear from you.
          </p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <div className="d-flex flex-column gap-3">
              <div className="contact-info-card d-flex align-items-start gap-3">
                <FiMapPin size={22} style={{ color: 'var(--color-pink)' }} />
                <div>
                  <h6 className="mb-1">Visit Us</h6>
                  <p className="text-muted small mb-0">123 Rosewood Avenue, Beauty District, NY 10001</p>
                </div>
              </div>
              <div className="contact-info-card d-flex align-items-start gap-3">
                <FiMail size={22} style={{ color: 'var(--color-pink)' }} />
                <div>
                  <h6 className="mb-1">Email Us</h6>
                  <p className="text-muted small mb-0">hello@PrimePickbeauty.com</p>
                </div>
              </div>
              <div className="contact-info-card d-flex align-items-start gap-3">
                <FiPhone size={22} style={{ color: 'var(--color-pink)' }} />
                <div>
                  <h6 className="mb-1">Call Us</h6>
                  <p className="text-muted small mb-0">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={8}>
            <div className="filter-card">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      className="form-control-luxury"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      className="form-control-luxury"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm={12}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      placeholder="How can we help you?"
                      className="form-control-luxury"
                      style={{ borderRadius: 'var(--radius-md)' }}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm={12}>
                    <button type="submit" className="btn-luxury d-flex align-items-center gap-2" disabled={submitting}>
                      {submitting ? 'Sending...' : <>Send Message <FiSend /></>}
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact
