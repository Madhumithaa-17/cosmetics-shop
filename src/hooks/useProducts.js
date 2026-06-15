import { useEffect, useState } from 'react'


const CATEGORIES = ['beauty', 'skin-care', 'fragrances']

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const requests = CATEGORIES.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}?limit=100`).then(
            (res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${cat} products`)
              return res.json()
            }
          )
        )

        const results = await Promise.all(requests)
        const merged = results.flatMap((r) => r.products || [])

        
        const unique = Array.from(
          new Map(merged.map((p) => [p.id, p])).values()
        )

        if (isMounted) {
          setProducts(unique)
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Something went wrong')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAll()
    return () => {
      isMounted = false
    }
  }, [])

  return { products, loading, error }
}
