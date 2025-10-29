import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

/**
 * Ensures a sales record exists for an OAuth user.
 * Creates a user from their OAuth metadata.
 * If this is the first user (system not initialized), they become admin.
 * Subsequent OAuth users are regular users.
 * Returns true if this was the first user.
 */
export async function ensureSalesRecordForOAuthUser(user: User): Promise<boolean> {
  // Check if sales record already exists
  const { data: existingSale } = await supabase
    .from("sales")
    .select("id")
    .eq("user_id", user.id)
    .single();

  // If sales record exists, we're done
  if (existingSale) {
    return false;
  }
  
  // Use RLS-safe database function to check if any sales exist
  // This bypasses RLS to give accurate count
  const { data: hasSales, error: checkError } = await supabase.rpc("check_has_sales");
  
  let isFirstUser = false;
  if (checkError) {
    console.error("Failed to check sales existence:", checkError);
    // Default to non-admin if check fails (safer)
    isFirstUser = false;
  } else {
    isFirstUser = !hasSales; // No sales = first user
  }

  // Extract user info from OAuth metadata
  const metadata = user.user_metadata || {};
  const email = user.email || "";
  
  // Get name from metadata (Google provides these)
  let first_name = metadata.first_name || metadata.given_name || "";
  let last_name = metadata.last_name || metadata.family_name || "";
  
  // If no names in metadata, try to extract from full_name
  if (!first_name && !last_name && metadata.full_name) {
    const nameParts = metadata.full_name.split(" ");
    first_name = nameParts[0] || "";
    last_name = nameParts.slice(1).join(" ") || "";
  }
  
  // Fallback to email username if still no name
  if (!first_name && !last_name) {
    first_name = email.split("@")[0] || "User";
    last_name = "";
  }

  // Get avatar from OAuth provider (Google provides picture)
  const avatarUrl = metadata.avatar_url || metadata.picture || null;
  const avatar = avatarUrl ? { src: avatarUrl } : null;

  // Create sales record for the OAuth user
  // First user becomes admin, subsequent users are regular
  const { error } = await supabase.from("sales").insert({
    user_id: user.id,
    email,
    first_name,
    last_name,
    administrator: isFirstUser,
    disabled: false,
    avatar,
  });

  if (error) {
    console.error("Failed to create sales record for OAuth user:", error);
    throw new Error("Failed to complete OAuth sign-in");
  }
  
  return isFirstUser;
}
