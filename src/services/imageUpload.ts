
import { supabase } from "../integrations/supabase/client";

export async function uploadBlogImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return publicUrl;
}
