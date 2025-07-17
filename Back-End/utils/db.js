import mongoose from "mongoose";

export const connectDB=async()=>{
 
 
    try {
       
        mongoose.connection.on('connected',()=>console.log(`✅ Database Connection established`))
        mongoose.connection.on('error', (err)=> console.error(err));
        await mongoose.connect(process.env.mongoUrl)

    } catch (error) {
        console.log(error );
        
    }
}