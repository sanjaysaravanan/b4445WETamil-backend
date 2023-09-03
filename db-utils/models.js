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


const appUserSchema = new mongoose.Schema({
  id: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true
  },
  role: {
    type: 'string', // admin, management, normal
    required: true
  },
  isVerified: {
    type: 'boolean',
    required: true
  }
});

const AppUserModel = mongoose.model('app-users', appUserSchema);

export {
  user,
  AppUserModel,
}

