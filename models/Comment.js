import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
      required: true
  },


    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
  {
    timestamps: true,
  }
);

const Comment = model("comment", commentSchema);

export default Comment;