import { Schema, model } from 'mongoose';

import Instruction from './Instruction';

const Category = new Schema({
  id: String,
  title: String,
  instructions: [{ type: Schema.Types.ObjectId, ref: 'Instruction' }],
});

export default model('CategoryItem', Category);
