import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const clusterName = process.env.DB_CLUSTER || '';
const dbName = process.env.DB_NAME || '';

const cloudMongoUrl = `mongodb+srv://${username}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

// Local DB Connection
const localMongoUrl = 'mongodb://localhost:27017/b4445wetamil';

const connectToDb = async () => {
  try {
    await mongoose.connect(cloudMongoUrl, {
      useNewUrlParser: true,
    });
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectToDb;