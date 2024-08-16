import axios from 'axios';

// use axios to set up header for the api key
const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "live_qiFvF5Z4Dz4NFDZg3cezsZFVJgGEO6IY9qbsVrUvBeUbYkI3K94Tc5W0uuhMd19p"
  },
})

// set up image upload form
export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/images/upload', formData)
}

// get all uploaded cats (limit shows multiple cats)
export const getImages = () => {
  return api.get('/images?limit=100')
}

// set up voting and favorites
// update the vote count using the image id and the value of votes 
export const voteImage = (imageID: string, value: number) => {
  return api.post('/votes', {
    image_id: imageID,
    value: value,
  })
}

// favorite an image using the image id
export const favoriteImage = (imageID: string) => {
  return api.post('/favourites', {
    image_id: imageID
  })
}

// unfavorite an image using the image id
export const unfavoriteImage = (favoriteID: string) => {
  return api.delete(`/favourites/${favoriteID}`)
}

// get the amount of votes an image has using an image id
export const getVotes = (imageID: string) => {
  return api.get('/votes', {
    params: {
      image_id: imageID
    },
  })
}

// get the favorites
export const getFavorites = () => {
  return api.get('/favourites')
}
