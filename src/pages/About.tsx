
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import Navigation from "../components/Navigation";

interface About {
  content: string;
  updated_at: string;
}

export default function About() {
  const { data: about, isLoading } = useQuery({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      return data as About;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-4" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
          </div>
        ) : about?.content ? (
          <div className="prose prose-lg max-w-none">
            {about.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No content available yet.</p>
        )}
      </div>
    </div>
  );
}
