
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, Plus, Eye, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../integrations/supabase/client";

interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  excerpt: string | null;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  tech: string[] | null;
  image_url: string | null;
  is_website: boolean;
}

export default function OverviewSection() {
  const { data: blogs } = useQuery({
    queryKey: ["blogs-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {blogs?.filter(b => b.published)?.length || 0} published
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground mt-1">
              Feature coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground mt-1">
              Feature coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogs?.slice(0, 5).map((blog) => (
                <div key={blog.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    blog.published 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
              {(!blogs || blogs.length === 0) && (
                <p className="text-muted-foreground">No blog posts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects?.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <div className="flex gap-2 mt-1">
                      {project.tech?.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {(!projects || projects.length === 0) && (
                <p className="text-muted-foreground">No projects yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
