// users who can login to see the data of the application

import express from 'express';

import { AppUserModel } from '../db-utils/models.js';

import { v4 } from 'uuid';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { mailOptions, transporter } from './mail.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {

    const payload = req.body;
    // check if the email already exists in the database
    // Find an user by email
    const appUser = await AppUserModel.findOne({ email: payload.email }, { id: 1, name: 1, email: 1, _id: 0 });

    if (appUser) {
      res.status(409).send({ msg: 'User already exists' });
      return;
    }

    // hashing the password for storing in DB
    bcrypt.hash(payload.password, 10, async function (err, hash) {

      if (err) {
        res.status(500).send({ msg: 'Error in registering' });
        return;
      }

      const authUser = new AppUserModel({ ...payload, password: hash, id: v4(), role: 'admin', isVerified: false });
      await authUser.save();

      const verifyToken = jwt.sign({ email: payload.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      const link = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`

      await transporter.sendMail({ ...mailOptions, to: payload.email, text: `Hi Hello, please verify Your email ${link}` });
    })

    res.send({ msg: 'User Registered Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error in creating' });
  }
});


authRouter.get('/:email', async function (req, res) {
  try {
    const email = req.params.email;
    const appUser = await AppUserModel.findOne({ email }, { id: 1, name: 1, email: 1, _id: 0 });
    res.send(appUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error occuerred while fetching users' });
  }
});


authRouter.post('/verify', async function (req, res) {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
      await AppUserModel.updateOne({ email: result.email }, { '$set': { isVerified: true } });
    });

    res.send({ msg: 'User Verified' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error occuerred while fetching users' });
  }
});


// Login
authRouter.post('/login', async function (req, res) {
  try {

    const payload = req.body;
    const appUser = await AppUserModel.findOne({ email: payload.email }, { id: 1, name: 1, email: 1, role: 1, password: 1, _id: 0 });

    if (appUser) {
      await bcrypt.compare(payload.password, appUser.password, (_err, result) => {
        if (!result) {
          res.status(401).send({ code: 0, msg: 'Invalid credentials' });
        } else {
          const resposneObj = appUser.toObject();
          delete resposneObj.password;
          const accessToken = jwt.sign({ role: resposneObj.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
          delete resposneObj.role;
          res.send({ ...resposneObj, accessToken });
        }
      })
    } else {
      res.status(404).send({ code: -1, msg: 'User not found' });
    }
  } catch (err) {

  }
});


export default authRouter;

