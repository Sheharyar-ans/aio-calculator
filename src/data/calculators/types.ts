export interface FAQItem {
  question: string;
  answer: string;
}

export interface SourceCitation {
  claim: string;
  source: string;
  url?: string;
  date: string;
}

export interface WorkedExample {
  title: string;
  inputs: Record<string, string | number>;
  calculationHtml: string;
  result: string;
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  category: 'financial' | 'health' | 'math' | 'everyday';
  badge?: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  directAnswer: string;
  formulaHtml: string;
  workedExample: WorkedExample;
  steps: string[];
  limitations: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  sources: SourceCitation[];
  toolType: string;
  initialDefaults: Record<string, any>;
  hubTabs?: Array<{ id: string; title: string }>;
}
