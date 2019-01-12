import { Schema, model } from 'mongoose';

const Instruction = new Schema({
  id: String,
  title: String,
  command: String,
});

export default model('Instruction', Instruction);
