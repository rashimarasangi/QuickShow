import React, { useState } from 'react'
import { dummyShowsData } from '../../assets/assets';


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

  return (
    <div>
      
    </div>
  )
}

export default AddShows
