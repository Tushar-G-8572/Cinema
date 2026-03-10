import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({

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

    progress:{
        type:Number,
        default:0
    },

    completed:{
        type:Boolean,
        default:false
    },

    watchedAt:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
})

/* prevent duplicates */

watchHistorySchema.index({ user:1 , movie:1 },{ unique:true });

const watchHistoryModel = mongoose.model("watch-history",watchHistorySchema);

export default watchHistoryModel;