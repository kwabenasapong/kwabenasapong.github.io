
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Navigation from "../components/Navigation";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
  cover_image: string | null;
}

export default function Blogs() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {blog.cover_image && (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {blog.excerpt || "No excerpt available"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {blogs?.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center">
                No blog posts available yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
