import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

router.route('/notes').post(NoteController.addNote);

router.route('/notes/:noteId/:laneId').delete(NoteController.deleteNote);

router.route('/notes/:noteId').put(NoteController.editNote);

router.route('/move-note/:noteId/:sourceLaneId/:targetLaneId').put(NoteController.moveNote);

router.route('/move-within/:laneId/:targetId/:sourceId').put(NoteController.moveWithin);

export default router;
