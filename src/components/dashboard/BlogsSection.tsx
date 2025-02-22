
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Pencil, Trash, Image as ImageIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  excerpt: string | null;
  created_at: string;
  cover_image: string | null;
  author_id: string;
}

export default function BlogsSection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs-all"],
    queryFn: async () => {
      console.log("Fetching all blogs");
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blogs: " + error.message);
        throw error;
      }

      console.log("Fetched blogs:", data);
      return data as Blog[];
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting blog:", id);
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-all"] });
      toast.success("Blog post deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete blog post: " + error.message);
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      console.log("Toggling blog publish state:", { id, published });
      const { error } = await supabase
        .from("blogs")
        .update({ published: !published })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-all"] });
      toast.success("Blog status updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update blog status: " + error.message);
    },
  });

  const handleTogglePublish = useCallback(async (id: string, published: boolean) => {
    togglePublishMutation.mutate({ id, published });
  }, [togglePublishMutation]);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteBlogMutation.mutate(id);
    }
  }, [deleteBlogMutation]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading blogs. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => navigate("/blog/new")}>
          <Plus className="mr-2" /> New Blog Post
        </Button>
      </div>
      
      <div className="grid gap-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-20 bg-gray-100" />
                <CardContent className="h-16 bg-gray-50" />
              </Card>
            ))}
          </div>
        ) : blogs?.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No blog posts yet. Create your first post!
            </CardContent>
          </Card>
        ) : (
          blogs?.map((blog) => (
            <Card key={blog.id}>
              <div className="flex">
                {blog.cover_image ? (
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{blog.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={blog.published ? "default" : "outline"}
                        onClick={() => handleTogglePublish(blog.id, blog.published)}
                        disabled={togglePublishMutation.isPending}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/blog/edit/${blog.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleteBlogMutation.isPending}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {blog.excerpt || "No excerpt"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Created: {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
