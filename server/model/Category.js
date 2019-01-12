import { Schema, model } from 'mongoose';

const Instruction = new Schema({
  id: String,
  title: String,
  command: String,
});


const Category = new Schema({
  id: String,
  title: String,
  instructions: [Instruction],
});

export default model('CategoryItem', Category);
