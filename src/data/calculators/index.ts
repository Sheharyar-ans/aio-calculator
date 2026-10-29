import type { CalculatorDefinition } from './types';
import { financialCalculators } from './financial';
import { healthCalculators } from './health';
import { mathCalculators } from './math';
import { everydayCalculators } from './everyday';

export * from './types';
export { financialCalculators } from './financial';
export { healthCalculators } from './health';
export { mathCalculators } from './math';
export { everydayCalculators } from './everyday';

export const allCalculators: CalculatorDefinition[] = [
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...everydayCalculators
];

export const calculatorsBySlug: Record<string, CalculatorDefinition> = Object.fromEntries(
  allCalculators.map((c) => [c.slug, c])
);

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculatorsBySlug[slug];
}

export function getCalculatorsByCategory(category: string): CalculatorDefinition[] {
  return allCalculators.filter((c) => c.category === category);
}

export const popularTools: CalculatorDefinition[] = allCalculators.filter((c) => c.badge === 'Popular');
export const tier1Tools: CalculatorDefinition[] = allCalculators.filter((c) => c.badge === 'Tier 1');
export const phase2Tools: CalculatorDefinition[] = allCalculators.filter((c) => c.badge === 'Phase 2');
