const { default: Blog } = require("@/models/blog"); 

import connect_to_DB from "@/database"; 

import { NextResponse } from "next/server";




export async function GET(){
    try {
        await connect_to_DB()  
        const blogs_in_DB =  await Blog.find() 
       if(blogs_in_DB.length){
         return NextResponse.json({
             success: true,
             blogs: blogs_in_DB
         });
       } else {
         return NextResponse.status(404).json({
             success: false,
             message: 'No blogs found'
         });
       }
        
        
    } catch (error) { 
        console.error(`Error fetching blogs: ${error.message}`);
        return NextResponse.status(500).json({
            success: false,
            message: 'Failed to fetch blogs'
        });
        
    }
  

 
}