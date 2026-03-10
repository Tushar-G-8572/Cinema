import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const getTrailer = async (id) => {

  try {

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      }
    );

    const trailer = response.data.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    );

    const trailerUrl = trailer
    
    ?`https://www.youtube.com/watch?v=${trailer.key}`
    : null;

    return trailerUrl

  } catch (error) {

    console.log(error);

    return error;

  }
};