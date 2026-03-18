import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, //CreatedAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
