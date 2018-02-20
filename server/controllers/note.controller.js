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
  Lane.findOne({ id: laneId }).then(lane => {
    newNote.sort = lane.notes.length + 1;
    newNote.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      lane.notes.push(saved);
      lane.save();
      res.json(saved);
    });
  });
}

export function editNote(req, res) {
  Note.update({ id: req.params.noteId }, { task: req.body.task }).exec((err, note) => {
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

/* eslint no-param-reassign: ["error", { "props": false }]*/
export function moveNote(req, res) {
  const { noteId, sourceLaneId, targetLaneId } = req.params;
  if (!noteId || !sourceLaneId || !targetLaneId) {
    res.status(400).end();
  }
  Note.findOne({ id: noteId }).then(note => {
    Lane.findOne({ id: sourceLaneId }).then(sourceLane => {
      sourceLane.notes.pull(note);
      sourceLane.notes.forEach(noteUpdateSort => {
        if (noteUpdateSort.sort > note.sort) {
          noteUpdateSort.sort -= 1;
          noteUpdateSort.save();
        }
      });
      sourceLane.save();
      Lane.findOne({ id: targetLaneId }).then(targetLane => {
        note.sort = targetLane.notes.length + 1;
        note.save().then(() => {
          targetLane.notes.push(note);
          targetLane.save();
        });
      }).then(() => res.json(sourceLane));
    });
  });
}

export function moveWithin(req, res) {
  const { laneId, sourceId, targetId } = req.params;
  Lane.findOne({ id: laneId }).then(lane => {
    Note.findOne({ id: sourceId }).then(sourceNote => {
      Note.findOne({ id: targetId }).then(targetNote => {
        const tempSort = sourceNote.sort;
        sourceNote.sort = targetNote.sort;
        targetNote.sort = tempSort;
        sourceNote.save();
        return targetNote.save();
      }).then(() => res.json(lane));
    });
  });
}