import { Schema, model } from 'mongoose';

const Instruction = new Schema({
  id: String,
  title: String,
  command: String,
  category: { type: Schema.Types.ObjectId, ref: 'CategoryItem' },
});

export default model('Instruction', Instruction);
