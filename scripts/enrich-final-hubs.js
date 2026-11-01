import fs from 'fs';
import path from 'path';

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

const finalSections = {
  'fitness-health-calculators': `
  <section class="hub-final-notes" style="margin-top: 1.5rem;">
    <h2>Long-Term Health Optimization and Evidence-Based Consistency</h2>
    <p>Sustained health transformation relies on incremental, measurable habits rather than extreme short-term interventions. Utilizing objective metabolic estimates provides a consistent framework to monitor physical changes over months and years. By regularly recalculating your caloric baseline as body weight and activity levels evolve, you prevent prolonged weight loss plateaus and support vital metabolic function.</p>
    <p>Our tools are continuously calibrated against the latest peer-reviewed clinical literature, ensuring that students, fitness professionals, and everyday individuals can make informed, health-promoting decisions backed by verified scientific research.</p>
  </section>
`,
  'math-calculators': `
  <section class="hub-final-notes" style="margin-top: 1.5rem;">
    <h2>Bridging Theoretical Mathematics with Real-World Engineering</h2>
    <p>Mathematical principles are not isolated classroom abstractions: they govern mechanical engineering tolerances, financial portfolio modeling, computer graphics rendering, and data science algorithms. Mastering core mathematical concepts fosters analytical problem-solving abilities that translate across high-growth technical careers.</p>
    <p>Our mission is to make mathematical exploration open, accessible, and rigorous. With zero paywalls, zero registration hurdles, and instant interactive feedback, users can experiment with different numerical parameters, test edge cases, and deepen their quantitative intuition effortlessly.</p>
  </section>
`,
  'everyday-tools': `
  <section class="hub-final-notes" style="margin-top: 1.5rem;">
    <h2>High-Efficiency Digital Utilities for Modern Digital Workflows</h2>
    <p>Time management and operational clarity are among the most valuable assets in contemporary life. By removing unnecessary manual steps from routine administrative calculations, our lightweight utility tools give you back valuable time to focus on strategic, creative, and personal priorities.</p>
    <p>Each utility is designed according to mobile-first responsive design standards, ensuring that whether you are checking a discount in a retail aisle, timing workout intervals at the gym, or calculating a fuel stop on a road trip, our calculators load instantly and perform flawlessly across all modern smartphone, tablet, and desktop browsers.</p>
  </section>
`
};

for (const [slug, htmlToAdd] of Object.entries(finalSections)) {
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
  console.log(`Final push ${slug}: ${before} -> ${after} words`);
}
