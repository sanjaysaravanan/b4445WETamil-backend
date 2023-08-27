import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
    required: true
  },
  dob: {
    type: 'string',
    required: true
  },
  imageUrl: {
    type: 'string',
    required: true
  }
});

const user = mongoose.model('users', userSchema);

export {
  user
}

