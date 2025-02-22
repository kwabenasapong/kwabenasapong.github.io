
import { useState, useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";

interface About {
  id: string;
  content: string;
  updated_at: string;
}

export default function AboutSection() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState<string>("");

  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      console.log("Fetching about content");
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching about content:", error);
        toast.error("Failed to fetch about content");
        throw error;
      }

      if (data?.content) {
        setEditContent(data.content);
      }
      return data as About;
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (newContent: string) => {
      let response;
      
      if (!about?.id) {
        response = await supabase
          .from("about")
          .insert([{ content: newContent }])
          .select()
          .single();
      } else {
        response = await supabase
          .from("about")
          .update({ content: newContent })
          .eq("id", about.id)
          .select()
          .single();
      }
      
      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About content updated successfully");
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast.error("Failed to update about content: " + error.message);
    },
  });

  const handleSave = useCallback(() => {
    if (!editContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    updateAboutMutation.mutate(editContent);
  }, [editContent, updateAboutMutation]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditContent(about?.content || "");
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">About Content</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="h-[400px] animate-pulse bg-gray-100 rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Content</h2>
        <div className="space-x-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={updateAboutMutation.isPending}
              >
                {updateAboutMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>
              Edit Content
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {isEditing ? (
            <textarea
              className="w-full min-h-[400px] p-4 rounded-md border resize-y"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Enter about content..."
            />
          ) : (
            <div className="prose max-w-none">
              {about?.content ? (
                about.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p className="text-muted-foreground">No content available yet. Click 'Edit Content' to add some.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
