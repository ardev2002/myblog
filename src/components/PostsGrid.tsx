"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageRenderer from "@/components/ImageRenderer";

type Section = { imgUrl?: string };
type Post = { slug: string; title: string; sections: Section[] };

export default function PostsGrid({
  initialPosts,
  initialNextToken,
}: {
  initialPosts: any;
  initialNextToken: any;
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [nextToken, setNextToken] = useState<string | null>(initialNextToken);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!nextToken) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          setLoading(true);

          const res = await fetch(`/api/posts?nextToken=${nextToken}`);
          const { posts: newPosts, nextToken: newToken } = await res.json();

          setPosts((prev) => [...prev, ...newPosts]);
          setNextToken(newToken);
          setLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextToken, loading]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => {
          const firstSection = post.sections[0];
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col justify-between h-full">
                {firstSection?.imgUrl && (
                  <ImageRenderer path={firstSection.imgUrl} alt="Blog Image" />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold line-clamp-2">
                    {post.title}
                  </h2>
                </div>
                <div className="p-4 pt-0">
                  <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Infinite scroll loader */}
      {nextToken && (
        <div ref={loaderRef} className="py-6 flex justify-center">
          {loading ? (
            <span className="loading loading-dots loading-lg text-primary"></span>
          ) : (
            <span className="text-gray-500">Scroll down to load more...</span>
          )}
        </div>
      )}

    </>
  );
}
