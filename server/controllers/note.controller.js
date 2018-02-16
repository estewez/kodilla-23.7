import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;
  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }
  const newNote = new Note({
    task: note.task,
  });
  newNote.id = uuid();
  newNote.editing = false;
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function editNote(req, res) {
  Note.update({ id: req.params.noteId }, req.body.note).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    note.remove(() => {
      res.status(200).end();
    });
  });
}
