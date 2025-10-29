-- Create equipment-images storage bucket for equipment photos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'equipment-images',
  'equipment-images',
  true,
  10485760, -- 10MB limit
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Allow authenticated users to upload equipment images
create policy "Authenticated users can upload equipment images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'equipment-images');

-- Allow authenticated users to update their own equipment images
create policy "Users can update equipment images"
on storage.objects for update
to authenticated
using (bucket_id = 'equipment-images');

-- Allow authenticated users to delete their own equipment images  
create policy "Users can delete equipment images"
on storage.objects for delete
to authenticated
using (bucket_id = 'equipment-images');

-- Allow public read access to equipment images (for public listings)
create policy "Public can view equipment images"
on storage.objects for select
to public
using (bucket_id = 'equipment-images');
