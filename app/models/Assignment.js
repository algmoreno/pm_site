import { Schema, model, models } from 'mongoose';
import User from '@/app/models/User'

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String  },
  price: { type: Number, required: true }
})

const Assignment = models.Assignment || model("Assignment", assignmentSchema);

export default Assignment