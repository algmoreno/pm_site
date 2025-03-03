import { Schema, model, models } from 'mongoose';
import Appointment from '@/app/models/Appointment';

const userSchema = new Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  age: {type: Number, min: 18, required: true },
  description: {type: String},
  role: {type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]
})

const User = models.User || model("User", userSchema);

export default User