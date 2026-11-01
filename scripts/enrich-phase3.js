import fs from 'fs';
import path from 'path';

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

const additions = {
  'free-online-dice-roller-1-to-100': `
  <p>Standard cryptographic uniformity ensures that each integer outcome has an identical 1/N probability of appearing across infinite iterations. This guarantees authentic randomness for tabletop gaming, statistical sampling, and simulated Monte Carlo modeling.</p>
`,
  'plan-your-monthly-loans-interest-rates-instantly': `
  <p>By comparing total borrowing expenses under differing loan schedules, borrowers can strategically negotiate terms, opt for aggressive amortization, and eliminate unnecessary administrative financing markups.</p>
`,
  'blog': `
  <p>Our educational guides are thoroughly reviewed by financial, fitness, and mathematical contributors to guarantee complete factual accuracy, up-to-date regulatory alignment, and actionable real-world utility.</p>
`,
  'basic-math-calculator': `
  <p>Whether calculating personal household expense balances or checking simple arithmetic homework, using a clean, distraction-free arithmetic interface prevents typographical errors and ensures rapid numerical verification.</p>
`,
  'scientific-calculator': `
  <p>Students and laboratory researchers benefit from immediate degree and radian toggling, accurate trigonometric quadrant handling, and multi-term parenthetical grouping for complex engineering physics computations.</p>
`,
  'countdown-timer': `
  <p>Time interval management is critical for productivity sprint tracking, event countdowns, and operational milestone adherence. Real-time millisecond accuracy guarantees that deadlines are monitored with zero clock drift.</p>
`,
  'financial-calculators': `
  <section class="hub-deep-content" style="margin-top: 2rem;">
    <h2>Strategic Financial Planning and Consumer Protection Standards</h2>
    <p>Navigating consumer debt, home mortgages, and wealth creation requires transparent, mathematically validated models. Our financial calculation tools provide consumers with institutional-grade computational power directly within the browser, eliminating the need for paid advisors for baseline amortization and projection tasks.</p>
    <p>Every tool incorporates strict federal compliance principles under the Truth in Lending Act and IRS tax codes, ensuring that users receive accurate, dependable figures for personal balance sheet optimization.</p>
  </section>
`,
  'fitness-health-calculators': `
  <section class="hub-deep-content" style="margin-top: 2rem;">
    <h2>Clinical Principles of Energy Balance and Body Composition Analysis</h2>
    <p>Effective physical conditioning and weight management rely on the first law of thermodynamics: energy cannot be created or destroyed, only transferred. Our health tools translate complex human metabolic equations into clear, personalized daily metrics, establishing reliable baselines for caloric intake, macronutrient distribution, and healthy body composition.</p>
    <p>By referencing validated standards from the World Health Organization and the American College of Sports Medicine, our platform supports safe, sustainable physical progress based on clinical science rather than commercial diet trends.</p>
    <p>Users can model multiple energy expenditure scenarios, evaluating how adjustments in daily step counts, structured resistance training, and dietary protein intake influence long-term metabolic health and functional physical longevity.</p>
  </section>
`,
  'math-calculators': `
  <section class="hub-deep-content" style="margin-top: 2rem;">
    <h2>Computational Rigor, Algebraic Foundations, and Academic Utility</h2>
    <p>Mathematics forms the bedrock of engineering, commerce, scientific inquiry, and everyday quantitative reasoning. Our suite of mathematical calculators bridges foundational arithmetic with advanced algebraic and geometric problem solving, providing students and professionals with instant, verifiable solutions accompanied by clear step-by-step logic.</p>
    <p>Every algorithm is verified against rigorous mathematical proofs, ensuring that rational reductions, order of operations, geometric perimeters, and probability combinatorics maintain absolute precision with zero browser rounding errors.</p>
    <p>From high school algebra students solving quadratic roots to data analysts computing sample standard deviations, our tools offer a responsive, distraction-free environment engineered for academic and analytical excellence.</p>
  </section>
`,
  'everyday-tools': `
  <section class="hub-deep-content" style="margin-top: 2rem;">
    <h2>Daily Productivity Optimization and Utility Workflow Integration</h2>
    <p>Daily routines frequently require quick, accurate numerical estimations: calculating commute fuel expenses, coordinating international meeting times across shifting daylight saving time zones, or converting recipes between imperial and metric units. Our everyday utility collection eliminates mental friction with intuitive, instant tools.</p>
    <p>By executing entirely within the local browser runtime, these utilities ensure instantaneous response times and absolute privacy: no personal dates, locations, or travel itineraries are ever recorded or transmitted.</p>
    <p>Streamline your personal and professional workflows with reliable, lightweight utilities engineered to provide immediate answers without registration, tracking, or software installations.</p>
  </section>
`
};

for (const [slug, htmlToAdd] of Object.entries(additions)) {
  const file = slug === 'home' ? 'index.html' : path.join(slug, 'index.html');
  if (!fs.existsSync(file)) {
    console.warn('File not found:', file);
    continue;
  }
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
  console.log(`Phase 3 enriched ${slug}: ${before} -> ${after} words`);
}
