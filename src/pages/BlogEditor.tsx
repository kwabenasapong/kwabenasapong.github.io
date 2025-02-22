
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { CoverImageUpload } from "../components/blog/CoverImageUpload";
import { BlogPostForm } from "../components/blog/BlogPostForm";
import { uploadBlogImage } from "../services/imageUpload";

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  author_id: string;
  cover_image?: string | null;
}

export default function BlogEditor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    slug: "",
    published: false,
    author_id: user?.id || "",
    cover_image: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadBlogImage(file);
      setBlogPost(prev => ({ ...prev, cover_image: publicUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      console.error("Image upload error:", error);
      toast.error("Error uploading image: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const createBlogMutation = useMutation({
    mutationFn: async (post: BlogPost) => {
      if (!user?.id) {
        throw new Error("You must be logged in to create a blog post");
      }

      const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { data, error } = await supabase
        .from("blogs")
        .insert([{
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || null,
          slug: slug,
          published: false,
          author_id: user.id,
          cover_image: post.cover_image || null
        }])
        .select()
        .single();

      if (error) {
        console.error("Blog creation error:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Blog post created successfully");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Blog creation error:", error);
      toast.error("Failed to create blog post: " + error.message);
    },
  });

  const handleFieldChange = (field: string, value: string) => {
    setBlogPost(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogPost.title) {
      toast.error("Please enter a title for your blog post");
      return;
    }
    if (!blogPost.content) {
      toast.error("Please enter content for your blog post");
      return;
    }
    try {
      await createBlogMutation.mutateAsync(blogPost);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createBlogMutation.isPending || isUploading}
              >
                {createBlogMutation.isPending ? "Creating..." : "Create Post"}
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <CoverImageUpload
                coverImage={blogPost.cover_image}
                isUploading={isUploading}
                onImageUpload={handleImageUpload}
                onRemoveImage={() => setBlogPost(prev => ({ ...prev, cover_image: null }))}
              />

              <BlogPostForm
                title={blogPost.title}
                content={blogPost.content}
                excerpt={blogPost.excerpt}
                slug={blogPost.slug}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
