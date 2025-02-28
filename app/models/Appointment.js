import { Schema, model, models } from 'mongoose';
import User from '@/app/models/User'

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true, unique: true },
  duration: { type: Number, min: 30, max: 90, required: true },
  price: { type: Number, required: true }
})

const Appointment = models.Appointment || model("Appointment", appointmentSchema);

export default Appointment