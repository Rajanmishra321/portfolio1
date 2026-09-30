import { getAllPosts, getPost } from "@/lib/blog";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({ eyebrow: "Blog", title: post?.title ?? "Blog", subtitle: post?.description ?? "" });
}
