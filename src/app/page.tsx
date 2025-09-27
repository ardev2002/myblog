import { cookiesClient } from "@/utils/amplify-server-utils";
import Link from "next/link";

export default async function HomePage() {
  // ✅ Fetch latest posts
  const { data: posts } = await cookiesClient.models.Post.list({
    // You can add sorting/filtering if needed
    // sortDirection: "DESC", 
    // filter: { filterTag: { eq: "LATEST" } }, 
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Latest Blogs</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}?name=${post.slug}`}>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                By {post.author} • {post.filterTag}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
