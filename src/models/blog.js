import mongoose  from "mongoose"; 
import { Schema, } from "mongoose";

const BlogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
},{
    timestamps: true,

}

);

const Blog =  mongoose.models.Blog || mongoose.model("Blog", BlogSchema); 

export default Blog; 
