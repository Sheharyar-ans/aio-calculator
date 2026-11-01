import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.git', '_astro_source_archive', 'dist'].includes(f)) continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (f.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function normalize(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const files = getAllHtmlFiles('.');
let totalFaqSchemas = 0;
let schemaQuestionsTotal = 0;
let unmatchedQuestions = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  
  // Get all on-page questions
  const onPageQuestions = [];
  const h3Matches = [...content.matchAll(/<h3[^>]*class=["'][^"']*faq-question[^"']*["'][^>]*>([\s\S]*?)<\/h3>/gi)];
  for (const m of h3Matches) {
    onPageQuestions.push(normalize(m[1].replace(/<[^>]+>/g, ' ')));
  }
  const summaryMatches = [...content.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)];
  for (const m of summaryMatches) {
    onPageQuestions.push(normalize(m[1].replace(/<[^>]+>/g, ' ')));
  }

  for (const m of matches) {
    try {
      const data = JSON.parse(m[1].trim());
      if (data['@type'] === 'FAQPage' && Array.isArray(data.mainEntity)) {
        totalFaqSchemas++;
        for (const item of data.mainEntity) {
          if (item['@type'] === 'Question' && item.name) {
            schemaQuestionsTotal++;
            const qNorm = normalize(item.name);
            const found = onPageQuestions.some(opq => opq.includes(qNorm) || qNorm.includes(opq));
            if (!found) {
              unmatchedQuestions.push({ file, q: item.name });
            }
          }
        }
      }
    } catch (e) {}
  }
}

console.log('Total FAQPage schemas checked:', totalFaqSchemas);
console.log('Total FAQ questions checked:', schemaQuestionsTotal);
console.log('Unmatched questions count:', unmatchedQuestions.length);
if (unmatchedQuestions.length > 0) {
  console.log('Unmatched sample:', unmatchedQuestions);
}
