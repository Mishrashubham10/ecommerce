import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // BASIC INFO
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },

    // ADDRESS
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],

    // PROFILE
    profileImage: {
      type: String, // store image URL or path
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ROLE MANAGEMENT
    role: {
      type: String,
      enum: ['Customer', 'Admin', 'Seller'],
      default: 'Customer',
    },

    // SELLER INFO (optional)
    shopName: String,
    gstNumber: String,
    storeAddress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],

    // SOFT DELETE
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);

// HASHING PASSWORD
// userSchema.pre('save', async function(next) {
//   if (!this.isModified("password")) return next()
//   this.password = await bcrypt.hash(this.password, 10)
// })