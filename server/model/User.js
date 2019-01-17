import { Schema, model } from 'mongoose';

const User = new Schema({
  firstname: {
    type: String,
    lowercase: true,
  },
  lastname: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

User.virtual('fullname').get(() => `${this.firstname} ${this.lastname}`);

export default model('User', User);
