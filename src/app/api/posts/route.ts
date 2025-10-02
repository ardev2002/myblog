import { NextResponse } from "next/server";
import { cookiesClient } from "@/utils/amplify-server-utils";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const nextToken = searchParams.get("nextToken") || undefined;

    const { data, nextToken: newToken } = await cookiesClient.models.Post.list(
        { limit: 10, nextToken: nextToken },
    );

    // also fetch sections for each post
    const postsWithSections = await Promise.all(
        data.map(async (post) => {
            const { data: sections } = await post.sections();
            return { ...post, sections };
        })
    );

    return NextResponse.json({
        posts: postsWithSections,
        nextToken: newToken ?? null,
    });
}
