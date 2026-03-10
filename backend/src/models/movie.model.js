import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

    tmdbId:{
        type:Number,
        unique:true,
        sparse:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    originalTitle:{
        type:String
    },

    overview:{
        type:String,
        default:"No description available"
    },

    posterPath:{
        type:String,
        required:true
    },

    backdropPath:{
        type:String
    },

    trailer:{
        type:String
    },

    releaseDate:{
        type:Date
    },

    runtime:{
        type:Number
    },

    rating:{
        type:Number,
        min:0,
        max:10
    },

    voteCount:{
        type:Number,
        default:0
    },

    popularity:{
        type:Number,
        default:0
    },

    language:{
        type:String,
        default:"en"
    },

    genres:{
        type:[String],
        default:[]
    },

    adult:{
        type:Boolean,
        default:false
    },

    mediaType:{
        type:String,
        enum:["movie","tv"],
        default:"movie"
    }

},{
    timestamps:true
})

/* Indexes */

movieSchema.index({ rating:-1 })
movieSchema.index({ popularity:-1 })
movieSchema.index({ mediaType:1 })
movieSchema.index({ genres:1 })
movieSchema.index({ title:"text", overview:"text" })

const movieModel = mongoose.model("movie",movieSchema)

export default movieModel