import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with ID ${req.params.id} Not Found` });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      user: req.user._id,
      title: title,
      content: content,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note created successfully", savedNote });
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error in updatedNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted succesfully" });
  } catch (error) {
    console.error("Error in deletedNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
