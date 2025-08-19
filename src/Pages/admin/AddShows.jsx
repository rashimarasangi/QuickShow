import React, { useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import { useEffect } from 'react';
import Loading from '../../Components/Loading';
import Title from '../../Components/admin/Title';


const AddShows = () => {

  const curency = import.meta.env.VITE_CURRENCY 
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null);
  const [dateTimeSelection,setDateTimeSelection] =useState({});
  const [dateTimeInput,setDateTimeInput] = useState("");
  const [showprice,setShowPrice] = useState("");


  const FetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData)
  };

  useEffect(()=>{
    FetchNowPlayingMovies();
  },[])

  return nowPlayingMovies.length > 0 ? (
    <>
     <Title text1="Add" text2="Shows"/> 
     <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
     <div className='overflow-x-auto pb-4'>
      <div className='group flex flex-wrap gap-4 mt-4 w-max'>
         {nowPlayingMovies.map((movie)=>(
          <div key ={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:translate-y-1 transition duration-300`} >
            <div>
              <img src={movie.poster_path} alt="" />
            </div>
            </div>
         ))}
      </div>
     </div>
    </>
  ) : <Loading/>
}

export default AddShows
