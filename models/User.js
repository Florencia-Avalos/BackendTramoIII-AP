import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    password: { type: String, require: true },
    nameUser: { type: String, require: true,unique: true  },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/007/933/996/non_2x/ninja-logo-silhouette-of-japanese-fighter-vector.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

export default User;
