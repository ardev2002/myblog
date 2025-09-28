"use server";

import { cookiesClient } from "@/utils/amplify-server-utils";
import { revalidatePath } from "next/cache";

export async function publishBlog(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const categoryId = formData.get("categoryId") as 'MOBILES' | 'TECHNOLOGY' | 'TIPS_AND_TRICKS' | 'LIFESTYLE' | 'HEALTH_AND_WELLNESS' | 'ENTERTAINMENT' | 'SPORTS';
        const filterTag = formData.get("filterTag") as 'LATEST' | 'POPULAR';
        const author = formData.get("author") as string;

        // Parse sections JSON
        const sections = JSON.parse(formData.get("sections") as string);

        // ✅ Create Post
        const { data: post, errors: postErrors } = await cookiesClient.models.Post.create({
            title,
            category: categoryId,
            slug,
            filterTag,
            author,
        }, { authMode: 'userPool' });

        console.log(postErrors)

        // ✅ Create Sections linked to Post
        for (const sec of sections) {
            await cookiesClient.models.ContentSection.create({
                postSlug: post?.slug,
                subheading: sec.subheading,
                imgUrl: sec.imgUrl,
                paragraph: sec.paragraph,
                order: sec.order,
            }, { authMode: 'userPool' });
        }

        revalidatePath("/blogs");
    } catch (error) {
        console.log(error);
    }

}
