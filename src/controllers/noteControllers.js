import NoteModel from '../models/Note.js';

export const createNote = async (req, res) => {
    const { title, desc } = req.body;
    const newNote = new NoteModel({
        title,
        desc,
        userId: req.userId,
    });
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        console.log(`error ${err}`);
        return res.status(500).json({ msg: 'something went wrong' });
    }
};
export const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, desc } = req.body;

    try {
        const note = await NoteModel.findByIdAndUpdate(
            id,
            { title, desc },
            { new: true }
        );
        return res.status(200).json(note);
    } catch (err) {
        console.log(`error ${err}`);
        return res.status(500).json({ msg: 'something went wrong' });
    }
};

export const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await NoteModel.findByIdAndDelete(id);
        return res.status(202).json(note);
    } catch (err) {
        console.log(`error ${err}`);
        return res.status(500).json({ msg: 'something went wrong' });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({ userId: req.userId });
        return res.status(200).json(notes);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
};
