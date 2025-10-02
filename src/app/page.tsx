import PostsGrid from "@/components/PostsGrid";
import { cookiesClient } from "@/utils/amplify-server-utils";

// In HomePage (Server Component)
export default async function HomePage() {
  const { data, nextToken } = await cookiesClient.models.Post.list({ limit: 10 });

  const postsWithSections = await Promise.all(
    data.map(async (post: any) => {
      const { data: sections } = await post.sections();
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        sections: sections.map((s: any) => ({
          id: s.id,
          imgUrl: s.imgUrl,
          subheading: s.subheading,
          paragraph: s.paragraph,
          order: s.order,
        })),
      };
    })
  );

  return (
    <main className="max-w-7xl mx-auto p-4">
      <PostsGrid
        initialPosts={postsWithSections}
        initialNextToken={nextToken}
      />
    </main>
  );
}
