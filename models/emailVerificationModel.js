const mongoose = require('mongoose');

const emailVerificationModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m',
  },
});

const EmailVerification = mongoose.model(
  'EmailVerification',
  emailVerificationModelSchema,
);

module.exports = EmailVerification;
