import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Customer', 'Admin', 'Seller'],
      default: 'Customer',
    },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);