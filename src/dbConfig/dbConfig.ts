import mongoose from "mongoose";

export async function connect() {
    try {
        // console.log("THis is my mongoodb ",process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: process.env.DB_NAME, // optional if already in URI
          });
          
        const connection = mongoose.connection;
        connection.on('connected', () => console.log('MongoDB connected'));
        connection.on("error", console.error.bind(console, "MongoDB connection error:"));
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}