import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB connected in: ${url}`);
  } catch (error) {
    console.error(`Error connection: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;