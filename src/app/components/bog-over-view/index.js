"use client";
import { useState, useEffect } from "react";
import AddNewBlog from "../add-new-blog";
import React from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Blogs List",
  description: "blogs page",
};

function BlogOverView({ blogList }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  }); 
  console.log(editBlogId)

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSubmitForm() {
    setLoading(true);
    try {
      const response =
        editBlogId !== null
          ? await fetch(`/api/update-blog?id=${editBlogId}`,  {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          : await fetch("/api/add-blog", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setOpenDialog(false);
          setEditBlogId(null);
          setFormData({
            title: "",
            description: "",
            author: "",
          });
          // Reload the current page to get updated blog list
          router.refresh();
        } else {
          throw new Error(data.message);
        }
      } else {
        throw new Error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBlog(blogId) {
    setLoading(true);
    try {
      const response = await fetch(`/api/delete-blog?id=${blogId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          // Reload the current page to get updated blog list
          router.refresh();
        } else {
          throw new Error(data.message);
        }
      } else {
        throw new Error("Failed to delete blog. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("There was an error deleting the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (editBlog) => {
    setEditBlogId(editBlog._id);
    setFormData({
      title: editBlog?.title,
      description: editBlog?.description,
      author: editBlog?.author,
    });
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 bg-gradient-to-r from-blue-800 to-pink-600 p-6">
      <AddNewBlog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        setLoading={setLoading}
        handleSubmitForm={handleSubmitForm}
        editBlogId={editBlogId}
        setEditBlogId={setEditBlogId}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {blogList?.blogs && blogList.blogs.length > 0 ? (
          blogList.blogs.map((blog) => (
            <div
              key={blog._id} // Ensure this is a unique identifier
              className="p-4 border rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>
              <p className="text-gray-500">Author: {blog.author}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  aria-label={`Read more about ${blog.title}`}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  aria-label={`Delete ${blog.title}`}
                  className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() =>
                    // Implement delete functionality here
                    handleDeleteBlog(blog._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center   text-4xl">
            No blogs available.
          </p>
        )}
      </div>
    </div>
  );
}

export default BlogOverView;
