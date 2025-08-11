import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../Components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'

const MovieDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)

  // Added timeFormat so it exists
  const timeFormat = (mins) => {
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60
    return `${hours}h ${minutes}m`
  }

  const getShow = async () => {
    const foundShow = dummyShowsData.find(show => show._id === id)
    setShow({
      movie: foundShow,
      dateTime: dummyDateTimeData
    })
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img
          src={show.movie.poster_path}
          alt=""
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px" />
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
          </h1>
          <div className='flex items-center gap-2 to-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} .{' '}
            {show.movie.genres.map(genre => genre.name).join(' , ')} .{' '}
            {show.movie.release_date.split('-')[0]}
          </p>
          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5'/>
              Watch Trailer
              </button>
            <a href="" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
            <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={`w-5 h-5`}/>
            </button>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default MovieDetails
