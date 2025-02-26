import mongoose from 'mongoose';

const mongoClient = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI)
  } catch (error){
    console.log(error);
  }
}

export default mongoClient;