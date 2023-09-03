import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanjaysaravanan00007@gmail.com',
    pass: 'ntmtnlhslnjoyfql'
  }
});

export const mailOptions = {
  from: 'sanjaysaravanan00007@gmail.com',
  to: 'sanjaysaravanan1997@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
