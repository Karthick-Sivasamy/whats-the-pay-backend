const express = require('express');
const morgan = require('morgan');
const app = express();

// Local file Imports
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/user', userRouter);

// app.post('/create_user', async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = await User.create(req.body);
//     res.status(200).json({ user });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: 'You are good to go!' });
//   }
// });

app.use(globalErrorHandler);

module.exports = app;
