import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Bookmarks App
      </h1>

      <p>Save and share your bookmarks</p>

      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </main>
  );
}