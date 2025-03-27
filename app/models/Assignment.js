import { Schema, model, models } from 'mongoose';
import User from '@/app/models/User'

const assignmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateAssigned: { type: Date, required: true },
  title: { type: String, required: true },
  notes: { type: String  },
  fileNames: [{ type: String }]
})

const Assignment = models.Assignment || model("Assignment", assignmentSchema);

export default Assignment