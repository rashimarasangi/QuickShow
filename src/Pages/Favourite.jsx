import React from "react";
import { useFavourites } from "../contexts/FavouriteContext";
import MovieCard from "../Components/MovieCard";
import BlurCircle from "../Components/BlurCircle";
import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Favourite = () => {
  const { favourites, clearAllFavourites, removeFromFavourites } =
    useFavourites();
  const navigate = useNavigate();

  const handleClearAll = () => {
    if (favourites.length === 0) return;

    if (window.confirm("Are you sure you want to remove all favourites?")) {
      clearAllFavourites();
      toast.success("All favourites cleared");
    }
  };

  const handleRemoveFavourite = (movieId, movieTitle) => {
    removeFromFavourites(movieId);
    toast.success(`${movieTitle} removed from favourites`);
  };

  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle top="50px" left="50px" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Favourite Movies</h1>
          <p className="text-gray-400">
            {favourites.length} {favourites.length === 1 ? "movie" : "movies"}{" "}
            in your favourites
          </p>
        </div>

        {favourites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {favourites.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {favourites.map((movie) => (
            <div key={movie._id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemoveFavourite(movie._id, movie.title)}
                className="absolute top-2 left-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                title="Remove from favourites"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">
            No Favourite Movies
          </h2>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            You haven't added any movies to your favourites yet. Start exploring
            and add some movies you love!
          </p>
          <button
            onClick={() => navigate("/movies")}
            className="px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg font-medium transition-colors"
          >
            Explore Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default Favourite;
