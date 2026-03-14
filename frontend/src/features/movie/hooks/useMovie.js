import { useContext } from "react";
import { MovieContext } from "../movie.context";
import {
  getMoviesAndTv,
  discoverContent,
  searchMovies,
  getDetails
} from "../services/tmdb.api";

export function useMovie() {

  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used inside MovieProvider");
  }

  const {
    movieData,
    setMovieData,
    loading,
    setLoading
  } = context;



  // ✅ Fetch Movies / TV Row Wise (popular, top_rated etc)
  const handleFetchMovies = async (type, changes = "popular") => {

    try {

      setLoading(true);

      const data = await getMoviesAndTv(type, changes);

      setMovieData(prev => ({
        ...prev,
        [`${type}_${changes}`]: data
      }));

      return data;

    } catch (err) {

      console.log("Fetch Movie Error", err);
      return [];

    } finally {
      setLoading(false);
    }
  };



  // ✅ Discover Filter Movies / TV
  const handleDiscover = async (filters) => {

    try {

      setLoading(true);

      const data = await discoverContent(filters);

      setMovieData(prev => ({
        ...prev,
        discover: data
      }));

      return data;

    } catch (err) {

      console.log("Discover Error", err);
      return [];

    } finally {
      setLoading(false);
    }
  };



  // ✅ Search Movie / TV
  const handleSearch = async (title) => {

    try {

      setLoading(true);

      const data = await searchMovies(title);

      setMovieData(prev => ({
        ...prev,
        search: data
      }));

      return data;

    } catch (err) {

      console.log("Search Error", err);
      return [];

    } finally {
      setLoading(false);
    }
  };



  // ✅ Get Movie Details Page
  const handleGetDetails = async (type, id) => {

    try {

      setLoading(true);

      const data = await getDetails(type, id);

      setMovieData(prev => ({
        ...prev,
        details: data
      }));

      return data;

    } catch (err) {

      console.log("Details Error", err);
      return null;

    } finally {
      setLoading(false);
    }
  };



  return {
    movieData,
    loading,
    handleFetchMovies,
    handleDiscover,
    handleSearch,
    handleGetDetails
  };
}