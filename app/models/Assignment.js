import { Schema, model, models } from 'mongoose';
import User from '@/app/models/User'

const assignmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String  },
  vidLink: { type: String }
})

const Assignment = models.Assignment || model("Assignment", assignmentSchema);

export default Assignment