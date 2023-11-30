import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post', // Referencia al modelo User
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