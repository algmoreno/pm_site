import { Schema, model, models } from 'mongoose';
import User from '@/app/models/User'

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  startDatetime: { type: Date, required: true, unique: true },
  endDatetime: { type: Date, required: true, unique: true },
  service: { type: String, required: true },
  price: { type: Number, required: true }
})

const Appointment = models.Appointment || model("Appointment", appointmentSchema);

export default Appointment