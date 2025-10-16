import React, { createContext, useContext, useState, useEffect } from "react";

const FavouriteContext = createContext();

export const useFavourites = () => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouriteProvider");
  }
  return context;
};

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem("quickShow_favourites");
    if (savedFavourites) {
      try {
        setFavourites(JSON.parse(savedFavourites));
      } catch (error) {
        console.error("Error loading favourites from localStorage:", error);
        setFavourites([]);
      }
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem("quickShow_favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie) => {
    setFavourites((prev) => {
      // Check if movie is already in favourites
      const isAlreadyFavourite = prev.some((fav) => fav._id === movie._id);
      if (isAlreadyFavourite) {
        return prev; // Don't add if already exists
      }
      return [...prev, movie];
    });
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie._id !== movieId));
  };

  const toggleFavourite = (movie) => {
    const isFavourite = favourites.some((fav) => fav._id === movie._id);
    if (isFavourite) {
      removeFromFavourites(movie._id);
    } else {
      addToFavourites(movie);
    }
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie._id === movieId);
  };

  const clearAllFavourites = () => {
    setFavourites([]);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    toggleFavourite,
    isFavourite,
    clearAllFavourites,
    favouritesCount: favourites.length,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
