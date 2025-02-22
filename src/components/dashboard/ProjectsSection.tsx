
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  tech: string[] | null;
  image_url: string | null;
  is_website: boolean;
}

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery({
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button>
          <Plus className="mr-2" /> New Project
        </Button>
      </div>
      
      <div className="grid gap-6">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : (
          projects?.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                {project.tech && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
