import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  }
})

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('User', userSchema);