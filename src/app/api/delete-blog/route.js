import Blog from "@/models/blog"; 
import { NextResponse } from "next/server"; 
import connect_to_DB from "@/database"; 

export async function DELETE(req){ 
    try {
        await connect_to_DB()  
        const {searchParams} = new URL(req.url);
        const getCurrentBlogId = searchParams.get('id');

        if(!getCurrentBlogId){
            return NextResponse.status(400).json({
                success: false,
                message: "Blog ID not provided"
            });
        } 

        const deleteCurrentBlog = await Blog.findByIdAndDelete(getCurrentBlogId)

        if(deleteCurrentBlog){
            return NextResponse.json({
                success: true,
                message: "Blog deleted successfully"
            });
        } else {
            return NextResponse.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
       
    } catch (error) {
        console.error(error);
        return NextResponse.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }



}