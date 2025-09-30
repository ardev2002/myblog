import Link from "next/link";
import { cookiesClient } from "@/utils/amplify-server-utils";
import ImageRenderer from "@/components/ImageRenderer";


export const dynamic = 'force-static';

export default async function HomePage() {
  const { data: posts } = await cookiesClient.models.Post.list();

  // Fetch sections for all posts
  const postsWithSections = await Promise.all(
    posts.map(async (post) => {
      const { data: sections } = await post.sections();
      return { ...post, sections };
    })
  );

  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="grid gap-6 min-w-64 sm:grid-cols-3 lg:grid-cols-4">
        {postsWithSections.map((post) => {
          const firstSection = post.sections[0]; // get first section to show image
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between h-full">

                {firstSection?.imgUrl && (
                  <ImageRenderer path={firstSection.imgUrl} alt="Blog Image" />
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-1 line-clamp-2">
                    {post.title}
                  </h2>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
