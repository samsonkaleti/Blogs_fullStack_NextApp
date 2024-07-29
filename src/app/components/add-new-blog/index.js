"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddNewBlog = ({
  openDialog,
  setOpenDialog,
  formData,
  setFormData,
  loading,
  handleSubmitForm,
  editBlogId,
  setEditBlogId,
}) => {
  // console.log(formData)
  return (
    <div> 

        <div>
        <Button onClick = {() => setOpenDialog(true)}>Add New Blog</Button>
        </div>
      <Dialog
        open={openDialog}
       
        onOpenChange={() => {
          setOpenDialog(false);
          setFormData({
            title: "",
            description: "",
            author: "",
          });

          setEditBlogId(null);
        }}
      >
       
         
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> {editBlogId ? "Edit Blog" : "Add Blog"}</DialogTitle>
            <DialogDescription>
              Add a new blog to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                placeholder="Add new blog title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                className="col-span-3"
                placeholder="Add author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Add blog description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitForm} type="button" disabled={loading}>
              {loading ? "Adding..." : "Add Blog"}
            </Button>
            <Button
              type="button"
              onClick={() => setOpenDialog(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewBlog;
