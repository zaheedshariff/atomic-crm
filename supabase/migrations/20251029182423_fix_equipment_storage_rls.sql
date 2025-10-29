-- Drop the existing overly-permissive storage policies
drop policy if exists "Authenticated users can upload equipment images" on storage.objects;
drop policy if exists "Users can update equipment images" on storage.objects;
drop policy if exists "Users can delete equipment images" on storage.objects;
drop policy if exists "Public can view equipment images" on storage.objects;

-- Allow authenticated users to upload equipment images (sets owner to auth.uid())
create policy "Authenticated users can upload equipment images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'equipment-images');

-- Only allow users to update their own equipment images
create policy "Users can update their own equipment images"
on storage.objects for update
to authenticated
using (bucket_id = 'equipment-images' and auth.uid() = owner);

-- Only allow users to delete their own equipment images  
create policy "Users can delete their own equipment images"
on storage.objects for delete
to authenticated
using (bucket_id = 'equipment-images' and auth.uid() = owner);

-- Allow public read access to equipment images (for public listings)
create policy "Public can view equipment images"
on storage.objects for select
to public
using (bucket_id = 'equipment-images');
