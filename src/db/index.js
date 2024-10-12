import mongoose from 'mongoose';

export const connectDB = async () => {
  mongoose
    .connect('mongodb://0.0.0.0:27017/vcriate-assignment')
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(err => {
      console.log(err);
    });
};
