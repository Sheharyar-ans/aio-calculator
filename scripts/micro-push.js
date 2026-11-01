import fs from 'fs';
import path from 'path';

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

const microSections = {
  'fitness-health-calculators': `
  <p>Continuous progress requires steady commitment to nutritional quality, regular physical activity, and adequate restorative sleep. Use these tools as dependable benchmarks on your health journey.</p>
`,
  'math-calculators': `
  <p>Our calculation engine empowers lifelong learners, mathematics educators, and quantitative professionals to verify complex equations rapidly, ensuring reliable answers for academic assignments, competitive exams, and technical research projects.</p>
`,
  'everyday-tools': `
  <p>Simplify routine numeric decisions with fast, private, and precise web applications tailored for personal productivity, household financial tracking, and seamless cross-border communication.</p>
`
};

for (const [slug, htmlToAdd] of Object.entries(microSections)) {
  const file = path.join(slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = countWords(html);

  if (html.includes('<section class="faq-section"')) {
    html = html.replace('<section class="faq-section"', `${htmlToAdd}\n<section class="faq-section"`);
  } else if (html.includes('</article>')) {
    html = html.replace('</article>', `${htmlToAdd}\n</article>`);
  } else if (html.includes('</main>')) {
    html = html.replace('</main>', `${htmlToAdd}\n</main>`);
  }

  fs.writeFileSync(file, html);
  const after = countWords(html);
  console.log(`Micro push ${slug}: ${before} -> ${after} words`);
}
