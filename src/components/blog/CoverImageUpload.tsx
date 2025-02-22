
import { Button } from "../ui/button";
import { Image } from "lucide-react";

interface CoverImageUploadProps {
  coverImage: string | null;
  isUploading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onRemoveImage: () => void;
}

export function CoverImageUpload({
  coverImage,
  isUploading,
  onImageUpload,
  onRemoveImage,
}: CoverImageUploadProps) {
  if (coverImage) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onRemoveImage}
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="cover-image-upload"
        disabled={isUploading}
      />
      <label
        htmlFor="cover-image-upload"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        {isUploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <>
            <Image className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload cover image</p>
          </>
        )}
      </label>
    </div>
  );
}
