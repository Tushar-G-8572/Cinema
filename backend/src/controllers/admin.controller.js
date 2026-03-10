import movieModel from "../models/movie.model.js";
import { getTrailer } from "./trailer.controller.js";

const movieDummyData = {
    "adult": false,
    "backdrop_path": "/6yeVcxFR0j08vlv2OlL6zbewm4D.jpg",
    "id": 1265609,
    "title": "War Machine",
    "original_title": "War Machine",
    "overview": "...",
    "poster_path": "/rFhKkXhk7ClU03jQ5rHIApJDwev.jpg",
    "media_type": "movie",
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "popularity": 182.5873,
    "release_date": "2026-02-12",
    "vote_average": 6.771
}

export async function uploadController(req, res, next) {
    const tmdbId = movieDummyData.id;
    try {
        const {role} = req.user;
        if (role != 'admin') {
            return res.status(403).json({ message: "Unauthorised" });
        }

        const isAlreadyExists = await movieModel.findOne({ tmdbId });
        if (isAlreadyExists) return res.status(400).json({ message: "Movie already present in db" });

        const trailerUrl = await getTrailer(tmdbId);

        console.log(trailerUrl);

        const genres = movieDummyData.genre_ids.map(id => genreMap[id] || "Unknown")

        const movie = await movieModel.create({
            tmdbId: movieDummyData.id,
            posterPath: `https://image.tmdb.org/t/p/w500${movieDummyData.poster_path}`,
            title: movieDummyData.title,
            originalTitle: movieDummyData.original_title,
            language: movieDummyData.original_language,
            popularity: movieDummyData.popularity,
            mediaType: movieDummyData.media_type,
            backdropPath: `https://image.tmdb.org/t/p/original${movieDummyData.backdrop_path}`,
            releaseDate: movieDummyData.release_date,
            rating: movieDummyData.vote_average,
            trailer: trailerUrl,
            adult: movieDummyData.adult,
            genres
        });

        return res.status(201).json({
            message: "Movie uploaded",
            movie: {
                id: movie._id,
                title: movie.title,
                tmdbId: movie.tmdbId

            }
        })

    } catch (err) {
        console.log(err);
        err.status = 500;
        next(err);
    }
}

export async function updateController(req, res) {
    try {
        const {role} = req.user;
        if (role != 'admin') {
            return res.status(403).json({ message: "Unauthorised" });
        }

        const tmdbId = req.params.id;

        const movie = await movieModel.findOneAndUpdate(
            { tmdbId },
            req.body,
            { new: true }
        );
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        return res.status(200).json({ message: "movie updated successfully" });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while updating movie" })
    }
}

export async function deleteController(req, res) {
    const tmdbId = req.params.id;
    try {
        const {role} = req.user;
        if (role != 'admin') {
            return res.status(403).json({ message: "Unauthorised" });
        }
        const movie = await movieModel.findOneAndDelete({ tmdbId });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: "Movie deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while deleting movie" })
    }
}

export async function getMovieById(req, res) {
    const { id } = req.params;
    try {
        const {role} = req.user;
        if (role != 'admin') {
            return res.status(403).json({ message: "Unauthorised" });
        }

        const movie = await movieModel.findById(id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        return res.status(200).json({
            message: "Movie fetched",
            movie
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while getting movie" })
    }
}

export async function getAllMovies(req, res) {
    try {
        const {role} = req.user;
        if (role != 'admin') {
            return res.status(403).json({ message: "Unauthorised" });
        }
        const movies = await movieModel.find({});
        if (!movies) return res.status(404).json({ message: "No movies found" });

        return res.status(200).json({
            message: "All movies fetched",
            movies
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "error while getting all movies" });
    }
}