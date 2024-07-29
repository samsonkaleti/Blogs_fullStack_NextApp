import connect_to_DB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    author: Joi.string().min(3).max(50).required()
});

export async function POST(req) {
    try {
        await connect_to_DB(); 

        const extrasData = await req.json();  
        const { title, description, author } = extrasData;

        const { error } = AddNewBlog.validate({ title, description, author });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 }); 
        }

        const newBlog = await Blog.create(extrasData);

        if (newBlog) {
            return NextResponse.json({
                success: true,
                message: "Blog Added Successfully",
                blog: newBlog
            }, { status: 201 }); 
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to Add Blog"
            }, { status: 500 });
        }

    } catch (err) {
        console.error('Error in POST /api/add-blog:', err);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error'
        }, { status: 500 });
    }
}
