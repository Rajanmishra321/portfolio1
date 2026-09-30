import { caseStudies } from "@/data/portfolio";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  return ogImage({
    eyebrow: "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.caseStudy.summary ?? "",
  });
}
