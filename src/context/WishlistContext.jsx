import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const WishlistContext = createContext()

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lumiere_wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const isInWishlist = (id) => wishlist.some((item) => item.id === id)


  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) {
        toast.info(`${product.title} removed from wishlist`)
        return prev.filter((item) => item.id !== product.id)
      }
      toast.success(`${product.title} added to wishlist`)
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
