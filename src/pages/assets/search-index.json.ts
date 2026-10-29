import { allCalculators } from '../../data/calculators';

export async function GET() {
  const index = allCalculators.map((c) => ({
    name: c.name,
    slug: c.slug,
    url: `/${c.slug}/`,
    desc: c.shortDescription,
    cat: c.category,
    keywords: c.keywords || []
  }));

  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
