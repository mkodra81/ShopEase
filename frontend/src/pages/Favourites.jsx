import React from 'react'
import { useProductStore } from '../store/products.js'

const Favourites = () => {

  const favouriteProducts = useProductStore((state) => state.likedProducts)
  
  return (
    <div>Favourites</div>
  )
}

export default Favourites