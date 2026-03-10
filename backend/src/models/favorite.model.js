import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movie",
        required:true
    },

    mediaType:{
        type:String,
        enum:["movie","tv"],
        default:"movie"
    }

},{
    timestamps:true
})

/* prevent duplicate favorites */

favoriteSchema.index({ user:1 , movie:1 },{ unique:true })

/* faster user queries */

favoriteSchema.index({ user:1 })

const favoriteModel = mongoose.model("favorite",favoriteSchema)

export default favoriteModel