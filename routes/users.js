import express from 'express';

import { user as userModel } from '../db-utils/models.js';

import { v4 } from 'uuid';

const userRouter = express.Router();


// Enitiy like people, sports random application data
userRouter.get('/', async (req, res) => {
  try {
    const users = await userModel.find({}, { id: 1, name: 1, dob: 1, imageUrl: 1, _id: 0 });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error occuerred while fetching users' });
  }
});


userRouter.post('/', async (req, res) => {
  try {
    const user = new userModel({ ...req.body, id: v4() });
    await user.save();
    res.send({ msg: 'User Created Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error in creating' });
  }
});


userRouter.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    new userModel(req.body);
    await userModel.updateOne({ id: userId }, { '$set': req.body });
    res.send({ msg: 'User updated Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error in updating' });
  }
});


userRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await userModel.deleteOne({ id: userId });
    res.send({ msg: 'User Deleted Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error in Deleting' });
  }
});

export default userRouter;