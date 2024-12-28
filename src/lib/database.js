import mongoose from "mongoose";
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected successfully");
    } catch (e) {
        console.log(e);
    }
};

export default connectToDatabase;