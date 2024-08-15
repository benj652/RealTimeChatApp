import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected To MongoDB");
    }catch(e){
        console.log("Error connecting to MongoDB", e)
    }
};

export default connectToMongoDB;