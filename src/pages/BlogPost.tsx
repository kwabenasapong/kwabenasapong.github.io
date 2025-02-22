
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import Navigation from "../components/Navigation";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  cover_image: string | null;
  excerpt: string | null;
  author_id: string;
}

export default function BlogPost() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        {isLoading ? (
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8" />
            <div className="h-10 bg-gray-200 rounded mb-4 w-3/4" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        ) : post ? (
          <article className="prose prose-lg mx-auto">
            {post.cover_image && (
              <div className="mb-8">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full max-h-[500px] object-cover rounded-lg"
                />
              </div>
            )}
            <h1 className="mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 italic">
                {post.excerpt}
              </p>
            )}
            <div className="text-sm text-muted-foreground mb-8">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        ) : (
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
