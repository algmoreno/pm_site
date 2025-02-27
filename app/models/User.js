import { Schema, model, models } from 'mongoose';
import Appointment from '@/app/models/Appointment';

const userSchema = new Schema({
  name: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  age: {type: Number, min: 18, required: true },
  gender: {type: String}, 
  description: {type: String},
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
})

const User = models.User || model("User", userSchema);

export default User