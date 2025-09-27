import { cookiesClient } from '@/utils/amplify-server-utils'
import { StorageImage } from '@aws-amplify/ui-react-storage';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const blogId = (await params).id;
    const { data: post, errors } = await cookiesClient.models.Post.get({ id: blogId });
    if (errors || !post) {
        return (
            <main className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Blog not found</h1>
            </main>
        );
    }

    const { data: sections } = await cookiesClient.models.ContentSection.list({ 
        filter: {
            postId: { eq: blogId }
        }
    });

    return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* Meta info */}
      <div className="text-sm text-gray-500 mb-6">
        <span>By {post.author}</span> • <span>{post.filterTag}</span>
      </div>

      {/* Blog sections */}
      <article className="space-y-8">
        {sections.sort((a, b) => a.order! - b.order!)
          .map((sec) => (
            <section key={sec.id}>
              {sec.subheading && (
                <h2 className="text-xl font-semibold mb-2">{sec.subheading}</h2>
              )}
              <StorageImage alt='Image' path={'public/blog-images/iqoo-neo-10r.jpg'}/>
              {sec.paragraph && <p className="text-gray-700">{sec.paragraph}</p>}
            </section>
          ))}
      </article>
    </main>
  );
}
