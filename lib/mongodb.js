import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const mongoClient = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error){

  }
}

export default mongoClient;