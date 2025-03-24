import { Schema, model, models } from 'mongoose';
import Appointment from '@/app/models/Appointment';
import Assignment from '@/app/models/Assignment';

const userSchema = new Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  role: {type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }]
})

const User = models.User || model("User", userSchema);

export default User