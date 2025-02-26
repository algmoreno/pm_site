import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  // _id: {type: Number, unique: true},
  name: {type: String},
  email: {type: String, required: true, unique: true},
  age: {type: Number, min: 18},
  // appointments: [Appointments] // separate schema?
})

const User = models.User || model("User", userSchema);

export default User