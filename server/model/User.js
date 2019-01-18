import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
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

// UserSchema.virtual('fullname').get(() => `${this.firstname} ${this.lastname}`);

export default model('UserModel', UserSchema);
