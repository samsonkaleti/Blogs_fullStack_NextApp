import connect_to_DB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(3).max(500).required(),
    author: Joi.string().min(3).max(50).required()
});

export async function PUT(req) {
    try {
        // Connect to the database
        await connect_to_DB();
        
        // Parse URL parameters
        const { searchParams } = new URL(req.url);
        const editBlogId = searchParams.get('id');
        
        // Check if ID is provided
        if (!editBlogId) {
            return NextResponse.json({
                success: false,
                message: 'No blog ID provided'
            }, { status: 400 });
        }

        // Parse and validate request body
        const { title, description, author } = await req.json();
        const { error } = EditBlog.validate({ title, description, author });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 });
        }

        // Update the blog
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: editBlogId },
            { title, description, author },
            { new: true }
        );

        // Respond based on update result
        if (updatedBlog) {
            return NextResponse.json({
                success: true,
                message: 'Blog updated successfully',
                updatedBlog
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'No blog found with the provided ID'
            }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while updating the blog'
        }, { status: 500 });
    }
}
