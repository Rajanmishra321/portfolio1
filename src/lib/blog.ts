import fs from "node:fs";
import path from "node:path";

// Blog posts are Markdown files in src/content/blog. The file name becomes the URL slug.
// Frontmatter: title, description, date (YYYY-MM-DD), tags (comma-separated), draft (true/false).
// Drafts show up in `npm run dev` only — set `draft: false` to publish.

const dir = path.join(process.cwd(), "src/content/blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingTime: number;
  content: string;
};

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${file}`);

  const meta = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    })
  );
  const content = match[2].trim();

  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? "Untitled",
    description: meta.description ?? "",
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t: string) => t.trim()) : [],
    draft: meta.draft === "true",
    readingTime: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  const showDrafts = process.env.NODE_ENV !== "production";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
