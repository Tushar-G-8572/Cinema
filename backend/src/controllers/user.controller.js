import favoriteModel from '../models/favorite.model.js'
import movieModel from '../models/movie.model.js';
import watchHistoryModel from '../models/watchHistory.model.js'

export async function handleFavoriteController(req,res) {

    try{

        const { id } = req.user;
        const movieId = req.params.id;

        if(!id || !movieId){
            return res.status(400).json({message:"Invalid data"});
        }

        const movie = await movieModel.findById(movieId);

        if(!movie){
            return res.status(404).json({message:"Movie not found"});
        }

        const isFavorite = await favoriteModel.findOne({
            user:id,
            movie:movieId
        });

        if(isFavorite){
            return res.status(400).json({
                message:"Movie already in favorites"
            });
        }

        const favorite = await favoriteModel.create({
            user:id,
            movie:movieId,
            mediaType:movie.mediaType
        });

        return res.status(201).json({
            message:"Movie added to favorites",
            favorite
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error while adding favorite"
        });
    }

}

export async function handleWatchHistoryController(req,res) {

    const { id } = req.user;
    const movieId = req.params.id;

    try{

        if(!id || !movieId){
            return res.status(400).json({message:"Invalid data"});
        }

        const movie = await movieModel.findById(movieId);

        if(!movie){
            return res.status(404).json({message:"Movie not found"});
        }

        let history = await watchHistoryModel.findOne({
            user:id,
            movie:movieId
        });

        if(history){

            history.progress = 100;
            history.completed = true;
            history.watchedAt = new Date();

            await history.save();

            return res.status(200).json({
                message:"Watch history updated",
                watchHistory:history
            });

        }

        const watchHistory = await watchHistoryModel.create({
            user:id,
            movie:movieId,
            progress:100,
            completed:true
        });

        return res.status(201).json({
            message:"Movie added to watch history",
            watchHistory
        });

    }catch(err){

        console.log(err);

        return res.status(500).json({
            message:"Error while handling watch history"
        });

    }

}

export async function getFavoriteMovies(req,res) {

    try{

        const { id } = req.user;

        const movies = await favoriteModel
            .find({ user:id })
            .populate("movie","title posterPath rating mediaType")
            .lean();

        if(movies.length === 0){
            return res.status(200).json({
                message:"No favorite movies found",
                movies:[]
            });
        }

        return res.status(200).json({
            message:"Favorite movies fetched",
            movies
        });

    }catch(err){

        console.log(err);

        return res.status(500).json({
            message:"Error while getting favorite movies"
        });

    }
}


export async function getWatchHistoryMovies(req,res) {

    try{

        const { id } = req.user;

        const movies = await watchHistoryModel
            .find({ user:id })
            .populate("movie","title posterPath rating mediaType")
            .sort({ watchedAt:-1 })
            .lean();

        if(movies.length === 0){
            return res.status(200).json({
                message:"You don't have watch history",
                movies:[]
            });
        }

        return res.status(200).json({
            message:"Watch history fetched",
            movies
        });

    }catch(err){

        console.log(err);

        return res.status(500).json({
            message:"Error while fetching watch history"
        });

    }
}