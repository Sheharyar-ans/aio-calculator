import fs from 'fs';
import capsules from './capsule-definitions.js';

// Add the missing 2 article capsules
capsules['how-much-house-can-you-afford'] = "You can afford a house where total monthly housing costs (principal, interest, taxes, and insurance) stay under 28% of gross monthly income, and total debts remain under 36%. On a $100,000 household salary with zero debts, your maximum affordable monthly payment is $2,333, supporting a $350,000 to $400,000 home purchase.";
capsules['how-to-calculate-emi-and-save-interest'] = "To calculate your Equated Monthly Instalment (EMI), apply the reducing balance formula: EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]. Making extra principal prepayments cuts your effective interest charges dramatically, while choosing a shorter loan tenure saves tens of thousands in lifetime financing costs.";

fs.writeFileSync('./scripts/capsule-definitions.js', `export const capsules = ${JSON.stringify(capsules, null, 2)};\nexport default capsules;\n`);
console.log('Saved updated capsule-definitions.js');
