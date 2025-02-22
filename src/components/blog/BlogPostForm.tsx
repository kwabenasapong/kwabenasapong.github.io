
import { Input } from "../ui/input";

interface BlogPostFormProps {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  onChange: (field: string, value: string) => void;
}

export function BlogPostForm({
  title,
  content,
  excerpt,
  slug,
  onChange,
}: BlogPostFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Enter blog title..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          className="w-full min-h-[100px] p-4 rounded-md border resize-y"
          value={excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
          placeholder="Enter a brief excerpt..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          className="w-full min-h-[400px] p-4 rounded-md border resize-y"
          value={content}
          onChange={(e) => onChange('content', e.target.value)}
          placeholder="Write your blog post content..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Slug (optional)</label>
        <Input
          value={slug}
          onChange={(e) => onChange('slug', e.target.value)}
          placeholder="custom-url-slug"
        />
        <p className="text-sm text-muted-foreground">
          Leave empty to generate from title
        </p>
      </div>
    </div>
  );
}
