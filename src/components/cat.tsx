import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaHandPointUp, FaHandPointDown } from 'react-icons/fa';
import { CatImage } from '../types/cat';
import { voteImage, favoriteImage, unfavoriteImage, getVotes } from '../api/catApi';

interface CatProps {
  cat: CatImage;
  onFavoriteToggle: () => void;
}

const Cat: React.FunctionComponent<CatProps> = ({ cat, onFavoriteToggle }) => {
  const [voteScore, setVoteScore] = useState<number | undefined>(cat.voteScore);

  useEffect(() => {
    if (cat.id) {
      getVotes(cat.id).then((response) => {
        const votes = response.data
        const score = votes.reduce((acc: number, vote: any) => acc + vote.value, 0)
        setVoteScore(score)
      })
    }
  }, [cat.id])

  // set the vote score
  const handleVote = (value: number) => {
    voteImage(cat.id, value).then(() => {
      setVoteScore((prev) => (prev || 0) + value)
    })
  }

  // set favorite or unfavorite
  const handleFavorite = () => {
    if (cat.favoriteId) {
      unfavoriteImage(cat.favoriteId).then(onFavoriteToggle)
    } else {
      favoriteImage(cat.id).then(onFavoriteToggle)
    }
  }

  // work out score
  const showScore = voteScore && voteScore > 0 ? 'text-green-500' : voteScore && voteScore < 0 ? 'text-red-500' : 'text-white'

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={cat.url} alt="cat" className="w-full" />
      <div className="p-4">
        <div className="flex justify-between items-center">
        <button onClick={handleFavorite} className="text-red-500">
            {cat.favoriteId ? <FaHeart /> : <FaRegHeart />}
          </button>
          <div className="flex space-x-2">
          <span className={`${showScore}`}>{voteScore}</span>
            <button onClick={() => handleVote(1)} className="text-green-500">
              <FaHandPointUp />
            </button>
            <button onClick={() => handleVote(-1)} className="text-red-500">
              <FaHandPointDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cat;
