import React, { useState, useEffect } from 'react';
import { getImages, getFavorites } from '../api/catApi';
import Cat from '../components/cat';
import { CatImage } from '../types/cat';

const Homepage: React.FunctionComponent = () => {
  const [cats, setCats] = useState<CatImage[]>([])

  // Get all cats
  const fetchCats = () => {
    getImages().then((response) => {
      const catsData: CatImage[] = response.data
      getFavorites().then((favResponse) => {
        const favorites = favResponse.data
        const catsWithFavorites = catsData.map((cat) => {
          const favorite = favorites.find((fav: any) => fav.image_id === cat.id)
          return {
            ...cat,
            favoriteId: favorite ? favorite.id : undefined,
          }
        })
        setCats(catsWithFavorites)
      })
    })
  }

  useEffect(() => {
    fetchCats()
  }, [])

  return (
    <div className='container pt-4 mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cats.map((cat) => (
          <Cat key={cat.id} cat={cat} onFavoriteToggle={fetchCats} />
        ))}
      </div>
    </div>
  )
}

export default Homepage;
