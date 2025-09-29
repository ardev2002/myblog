//app/blog/[id]/page.tsx
import { cookiesClient } from '@/utils/amplify-server-utils'
import { CalendarDays } from 'lucide-react'
import React from 'react'
export const dynamic = 'force-static'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const slugFromUrl = (await params).id
  const { data: post, errors } = await cookiesClient.models.Post.get({ slug: slugFromUrl })

  if (errors || !post) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <div className="alert border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white">
          Blog not found
        </div>
      </main>
    )
  }

  const { data: sections } = await cookiesClient.models.ContentSection.list({
    filter: { postSlug: { eq: slugFromUrl } }
  })

  const { data: recentPosts } = await cookiesClient.models.Post.list({
    limit: 4,
    filter: { slug: { ne: slugFromUrl } }
  })

  const postedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const isLatest = (() => {
    const postDate = new Date(post.createdAt)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 14
  })()

  return (
    <main className="w-full min-h-screen bg-white text-black dark:bg-[#1d232a] dark:text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* === Blog Post Layout === */}
        <article className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

          <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-black/70 dark:text-white/70">
            <div className="flex items-center gap-2">
              <span className="font-medium">By {post.author}</span>
              {isLatest && <div className="badge badge-soft badge-info dark:badge-accent">
                LATEST
              </div>}

            </div>
            {postedDate && (
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-black/60 dark:text-white/60" />
                <span>{postedDate}</span>
              </div>
            )}
          </div>

          <div className="space-y-10">
            {sections
              .sort((a, b) => a.order! - b.order!)
              .map((sec) => (
                <section
                  key={sec.id}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm
                   bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700"
                >
                  {sec.subheading && <h2 className="text-2xl font-semibold mb-3">{sec.subheading}</h2>}
                  {sec.paragraph && <p className="leading-relaxed">{sec.paragraph}</p>}
                </section>
              ))}
          </div>
        </article>

        {/* === Recent Posts Layout === */}
        {recentPosts.length > 0 && (
          <aside className="w-full lg:w-1/3 flex-shrink-0 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Recent Posts</h3>
            <div className="grid grid-cols-1 gap-4">
              {recentPosts.map((rp) => (
                <a
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="font-medium text-lg mb-2 line-clamp-1">{rp.title}</h4>
                  <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">{rp.author}</p>
                </a>
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}
