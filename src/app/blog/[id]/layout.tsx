import { cookiesClient } from '@/utils/amplify-server-utils';
import extractDescription from '@/utils/extractDescription';
import getAbsoluteS3Url from '@/utils/getAbsoluteS3Url';
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const { data: post, errors } = await cookiesClient.models.Post.get({ slug: id });
    if (errors || !post) {
        return {
            title: 'Blog Not Found',
        };
    }
    const { data: sections } = await post.sections();

    return {
        title: post.title,
        description: sections[0].paragraph,
        authors: [{ name: post.author! }],
        openGraph: {
            title: post.title,
            siteName: 'Gyanrexa',
            locale: 'en_IN',
            url: `https://gyanrexa.com/blog/${post.slug}`,
            description: extractDescription(sections[0].paragraph),
            images: [{ url: getAbsoluteS3Url(sections[0].imgUrl!), width: 1200, height: 630 }],
            type: 'article'
        },

        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: extractDescription(sections[0].paragraph),
            images: [getAbsoluteS3Url(sections[0].imgUrl!)],
            creator: '@webdevankur',
        }
    }
}
export default function BlogDetailLayout(props: LayoutProps<'/blog/[id]'>) {
    return (
        <>
            {props.children}
        </>
    )
}
