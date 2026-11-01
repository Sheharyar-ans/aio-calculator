import fs from 'fs';
import path from 'path';

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

const hubs = {
  'financial-calculators': `
  <section class="hub-extended-guide" style="margin-top: 2rem;">
    <h2>Core Financial Decision Frameworks and Analytical Methodologies</h2>
    <p>Modern personal finance management requires disciplined quantitative evaluation across three fundamental dimensions: capital cost minimization, tax-advantaged asset growth, and cash flow liquidity preservation. Our financial tools provide consumers and investors with institutional-caliber modeling capabilities without commercial bias or subscription barriers.</p>
    <p>Borrowing decisions, such as home mortgages and personal loans, should always be evaluated using true actuarial amortization schedules rather than flat interest estimations. By understanding the front-loaded distribution of finance charges in long-term amortizing debt, borrowers can strategically time principal prepayments to achieve maximum compound savings.</p>
    <p>Similarly, wealth accumulation strategies benefit from disciplined systematic investing and understanding the exponential mechanics of compounding. Our investment and retirement planning calculators illustrate how regular contributions, consistent asset allocation, and low expense ratios compound over multi-decade investment horizons to secure financial independence.</p>
  </section>
`,
  'fitness-health-calculators': `
  <section class="hub-extended-guide" style="margin-top: 2rem;">
    <h2>Scientific Foundations of Health Assessment and Anthropometric Modeling</h2>
    <p>Reliable health metrics must be grounded in clinical physiology rather than arbitrary aesthetic trends. Our health and fitness calculation suite translates peer-reviewed scientific methodologies into actionable daily targets, providing users with evidence-based guidance for nutrition, exercise prescription, and body composition management.</p>
    <p>Body Mass Index serves as a recognized initial epidemiological screening tool, while our U.S. Navy circumference method provides an accessible and remarkably accurate estimate of relative fat-to-lean mass distribution. Understanding the distinction between total body mass and body composition enables athletes and fitness enthusiasts to tailor caloric and macronutrient targets specifically toward preserving functional lean tissue while reducing excess adiposity.</p>
    <p>Energy balance modeling through the Mifflin-St Jeor formula establishes personalized caloric baseline expenditures. By adjusting these baselines according to empirical activity factors and progressive training demands, individuals can pursue sustainable weight management protocols that protect metabolic rate and functional physiological longevity.</p>
    <p>Whether tracking prenatal gestational timelines, monitoring cardiovascular training heart rate zones, or optimizing sleep cycle architecture, each utility operates with complete privacy, processing all biometric inputs locally within your browser.</p>
  </section>
`,
  'math-calculators': `
  <section class="hub-extended-guide" style="margin-top: 2rem;">
    <h2>Mathematical Theory, Practical Applications, and Educational Integrity</h2>
    <p>Quantitative literacy empowers sound analytical thinking across academic, professional, and everyday life. Our mathematical calculation suite provides comprehensive computational solutions spanning foundational arithmetic, proportional percentage reasoning, algebraic equation solving, geometric dimensioning, and inferential statistics.</p>
    <p>Each tool emphasizes procedural transparency: rather than functioning as opaque black-box answer generators, our interfaces display step-by-step mathematical working, explicit intermediate reductions, and clear formula derivations. This approach reinforces conceptual understanding for students and provides verifiable proofs for engineers, scientists, and analysts.</p>
    <p>In real-world applications, numerical precision is critical. Our calculations implement exact fractional arithmetic and standardized IEEE floating-point handling to prevent catastrophic cancellation and rounding distortion across complex multi-step evaluations. From calculating combinations and permutations for probability models to resolving roots for second-degree polynomial quadratics, our tools deliver consistent, mathematically sound solutions.</p>
    <p>Explore our mathematical utilities to accelerate your coursework, verify complex quantitative models, and build confidence in applied mathematical problem solving.</p>
  </section>
`,
  'everyday-tools': `
  <section class="hub-extended-guide" style="margin-top: 2rem;">
    <h2>Everyday Productivity Engineering and Practical Numerical Solutions</h2>
    <p>Everyday personal and professional tasks constantly involve routine quantitative problem solving: calculating retail discounts during sales events, dividing restaurant checks with equitable tip allocations, tracking commuter fuel efficiency, or converting multi-unit engineering recipes. Our everyday utility collection streamlines these tasks through lightweight, instant, and intuitive tools.</p>
    <p>Modern remote work and international collaboration demand flawless synchronization across global timezones. Our timezone converter and date difference calculators account for daylight saving time anomalies and regional calendar conventions, allowing distributed teams and frequent travelers to plan seamless cross-border schedules without miscommunication.</p>
    <p>Digital privacy is an essential priority in modern computing. Our security utilities generate cryptographically sound credentials using the native Web Cryptography API, ensuring that generated passphrases possess high information entropy while never transmitting sensitive strings across external networks.</p>
    <p>Experience fast, privacy-focused utility tools designed to make everyday life simpler, more efficient, and mathematically precise.</p>
  </section>
`
};

for (const [slug, htmlToAdd] of Object.entries(hubs)) {
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
  console.log(`Enriched Hub ${slug}: ${before} -> ${after} words`);
}
