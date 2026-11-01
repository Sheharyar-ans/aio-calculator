import fs from 'fs';
import capsules from './capsule-definitions.js';

const calibrated = {
  ...capsules,
  'percentage-tricks-everyday-life': 'To calculate percentages mentally, use the 10% rule: shift the decimal left one spot to find 10%, then double for 20% or halve for 5%. For reverse discounts, divide sale price by (1 minus discount rate). On an $84 item at 30% off, original price was $120.'
};

let badCaps = 0;
for (const [slug, text] of Object.entries(calibrated)) {
  const words = text.split(' ').filter(Boolean).length;
  if (words < 40 || words > 48) {
    console.log('Bad capsule count:', slug, words);
    badCaps++;
  }
}
console.log('Total capsules:', Object.keys(calibrated).length, 'Bad capsules:', badCaps);

const output = `export const capsules = ${JSON.stringify(calibrated, null, 2)};\nexport default capsules;\n`;
fs.writeFileSync('./scripts/capsule-definitions.js', output);
console.log('Updated scripts/capsule-definitions.js successfully.');
