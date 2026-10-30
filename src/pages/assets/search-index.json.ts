import { allCalculators } from '../../data/calculators';
import { blogPosts } from '../../data/blogPosts';

export async function GET() {
  const calcItems = allCalculators.map((c) => ({
    name: c.name,
    slug: c.slug,
    url: `/${c.slug}/`,
    desc: c.shortDescription,
    cat: c.category,
    keywords: [c.primaryKeyword, ...(c.secondaryKeywords || [])]
  }));

  const articleItems = blogPosts.map((p) => ({
    name: p.title,
    slug: p.slug,
    url: `/${p.slug}/`,
    desc: p.summary,
    cat: 'guides',
    keywords: [p.title, ...(p.keywords || []), p.relatedToolSlug]
  }));

  const index = [...calcItems, ...articleItems];

  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
