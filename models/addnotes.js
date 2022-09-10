const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AddNoteSchema = new Schema({
    note: { type: String },
    date: { type: Date, default: Date.now },
});
const NoteModel = mongoose.model('Note', AddNoteSchema);
module.exports=NoteModel