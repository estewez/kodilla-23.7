import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', required: true, unique: true },
  sort: { type: 'Number', requierd: true },
}, {
  usePushEach: true,
});

export default mongoose.model('Note', noteSchema);
