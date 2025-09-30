"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CreateBlogDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle blog post creation logic here
    console.log("[v0] Blog post created")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Plus className="h-4 w-4" />
          New Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>Write a new blog post to share your thoughts and insights.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="blog-title">Title</Label>
            <Input id="blog-title" placeholder="10 Tips for Better Web Development" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-excerpt">Excerpt</Label>
            <Textarea
              id="blog-excerpt"
              placeholder="A brief summary of your blog post..."
              className="min-h-[80px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-content">Content</Label>
            <Textarea
              id="blog-content"
              placeholder="Write your blog post content here..."
              className="min-h-[200px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-image">Featured Image</Label>
            <div className="flex items-center gap-4">
              <Input id="blog-image" type="file" accept="image/*" className="flex-1" />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-category">Category</Label>
            <select
              id="blog-category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="tutorial">Tutorial</option>
              <option value="thoughts">Thoughts</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-status">Status</Label>
            <select
              id="blog-status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Publish Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
