import Link from "next/link";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: PageProps) {
  const { handle } = await params;
  console.log("Handle from URL:", handle);

  // Find profile by handle
  console.log("URL Handle =", handle);

const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("id,email,handle")
  .eq("handle", handle)
  .single();

console.log("PROFILE DATA:", profile);
console.log("Profile ID =", profile?.id);
console.log("Profile Handle =", profile?.handle);
console.log(profileError);

  if (profileError || !profile) {
    return (
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-gray-500">
          No profile exists for @{handle}
        </p>
      </div>
    );
  }

  // Get public bookmarks
const { data: bookmarks, error: bookmarksError } = await supabase
  .from("bookmarks")
  .select("*");

console.log("Bookmarks =", bookmarks);
console.log("Bookmarks Error =", bookmarksError);
if (bookmarksError) {
  console.log("Bookmarks Error:", bookmarksError);

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold">
        Error loading bookmarks
      </h1>

      <p>{bookmarksError.message}</p>
    </div>
  );
}

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        @{profile.handle}
      </h1>

      {bookmarks?.length === 0 ? (
        <p className="text-gray-500">
          No public bookmarks found.
        </p>
      ) : (
        <div className="space-y-3">
          {bookmarks?.map((bookmark) => (
            <div
              key={bookmark.id}
              className="border p-4 rounded-lg"
            >
              <Link
                href={bookmark.url}
                target="_blank"
                className="font-semibold text-blue-600"
              >
                {bookmark.title}
              </Link>

              <p className="text-sm text-gray-500 break-all">
                {bookmark.url}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}