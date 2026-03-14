import axios from "axios";
import { getTrailer } from "./trailer.controller.js";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

export async function fetchMoviesTvController(req, res) {
    // https://api.themoviedb.org/3/movie/popular?api_key=
    try {

        const { type, changes = "popular" } = req.params;

        if (type !== "movie" && type !== "tv") {
            return res.status(400).json({
                message: "Invalid type. Use movie or tv"
            });
        }

        const allowedChanges = [
            "popular",
            "top_rated",
            "upcoming",
            "now_playing"
        ];

        if (!allowedChanges.includes(changes)) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }
        const response = await api.get(`/${type}/${changes}`);

        return res.status(200).json({
            message: `${type} ${changes} fetched`,
            results: response.data.results
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching TMDB data"
        });

    }
}

export async function discoverMovieAndTv(req, res) {

    try {

        const {
            type,
            genre,
            rating,
            year,
            language,
            sort = "popularity.desc"
        } = req.query;

        if (type !== "movie" && type !== "tv") {
            return res.status(400).json({
                message: "Invalid type. Use movie or tv"
            });
        }

        const response = await api.get(`/discover/${type}`, {
            params: {
                with_genres: genre,
                "vote_average.gte": rating,
                primary_release_year: year,
                with_original_language: language,
                sort_by: sort
            }
        });

        return res.status(200).json({
            message: `${type} discovered`,
            results: response.data.results
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Error discovering content"
        });

    }
}

export async function searchMoviesByTitle(req, res) {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const response = await api.get("/search/multi", {
            params: {
                query: title,
                include_adult: false,
                language: "en-US",
                page: 1
            }
        });

        return res.status(200).json({
            success: true,
            results: response.data.results
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error while searching movie"
        });
    }
}

// // https://api.themoviedb.org/3/movie/19995?append_to_response=credits,videos,recommendations
export async function searchMovieById(req, res) {
  try {

    const { id, type } = req.params;
    console.log(id,type)

    const response = await api.get(
      `/${type}/${id}`,
      {
        params: {
          append_to_response: "credits,recommendations"
        }
      }
    );

    const trailerUrl = await getTrailer(response.data.id);
    // console.log(trailerUrl);

    const movie = {
      id: response.data.id,
      title: response.data.title || response.data.name,
      overview: response.data.overview,
      poster: response.data.poster_path,
      backdrop: response.data.backdrop_path,
      rating: response.data.vote_average,
      releaseDate: response.data.release_date || response.data.first_air_date,
      trailer:trailerUrl,
      genres: response.data.genres,
      runtime: response.data.runtime
    };

    const cast = response.data.credits.cast.slice(0, 10); // top 10 actors

    const crew = response.data.credits.crew.filter(
      person => person.job === "Director"
    );

    const recommendations = response.data.recommendations.results.slice(0, 12);

    return res.status(200).json({
      success: true,
      movie,
      cast,
      crew,
      recommendations
    });

  } catch (err) {

    console.log(err.response?.data || err.message);

    return res.status(500).json({
      message: "Error while fetching movie"
    });

  }
}