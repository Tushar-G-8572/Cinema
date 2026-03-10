import axios from "axios";
import { getTrailer } from "./trailer.controller";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

export async function fetchMoviesTvController(req, res) {

    try {

        const { type, changes = "popular" } = req.body;

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