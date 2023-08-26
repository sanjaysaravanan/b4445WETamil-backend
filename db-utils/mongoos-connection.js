import mongoose from "mongoose";

// mongodb://localhost:27017

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/b4445wetamil', {
      useNewUrlParser: true,
    });
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectToDb;