import mongoose from 'mongoose';
import { config } from './index';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);

    console.log(`[database]: MongoDB connected → ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('[database]: Connection failed:', error);
    process.exit(1); // Exit process with failure
  }

  // Handle connection events
  mongoose.connection.on('disconnected', () => {
    console.warn('[database]: MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[database]: MongoDB reconnected');
  });
};

export default connectDB;
