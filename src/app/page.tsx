import Link from "next/link";
import { cookiesClient } from "@/utils/amplify-server-utils";

export const dynamic = 'force-static';
// create once, safe for server

export default async function HomePage() {
  const { data: posts } = await cookiesClient.models.Post.list();
  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  By {post.author}
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full">
                  Read More
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

