import React, { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
      <FiArrowUp />
    </button>
  )
}

export default ScrollToTopButton
