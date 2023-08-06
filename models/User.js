import mongoose from "mongoose";
import { Schema, ObjectId as _Id } from "mongoose";
import validator from "validator";

export default mongoose.model(
  "User",
  Schema(
    {
      id: { type: _Id },
      fullName: {
        type: String,
        require: true,
        validator: {
          validator: (value) => value.length > 0,
          message: "User's full name must not be empty",
        },
      },
      email: {
        type: String,
        require: true,
        validator: {
          validator: (value) => validator.isEmail(value),
          message: "Invalid email",
        },
      },
      password: {
        type: String,
        require: true,
        validator: {
          validator: (value) => value.length >= 8,
          message: "Password must be at least 8 characters",
        },
      },
      gender: {
        type: String,
        enum: {
          values: ["Male", "Female"],
          message: "{VALUE} is not supported",
        },
        require: true,
      },
      phoneNumber: {
        type: String,
        require: true,
        validator: {
          validator: (value) => validator.isMobilePhone(value),
          message: "Invalid phone number",
        },
      },
      address: {
        type: String,
        require: true,
        validator: {
          validator: (value) => value.length > 0,
          message: "Address must not be empty",
        },
      },
      birthDate: {
        type: Date,
        require: true,
        validator: {
          validator: (value) => validator.isDate(value),
          message: "Invalid date",
        },
      },
      expiryDate: {
        type: Date,
        require: true,
        validator: {
          validator: (value) => validator.isDate(value),
          message: "Invalid date",
        },
      },
    },
    {
      timestamps: true,
    }
  )
);
