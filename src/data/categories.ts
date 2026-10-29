export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
}

export const CATEGORIES: Record<string, Category> = {
  financial: {
    id: 'financial',
    name: 'Financial Calculators',
    slug: 'financial-calculators',
    description: 'Empower your financial decisions with free calculators for mortgages, loans, investments, taxes, retirement, and compound interest. Zero sign-up, instant calculations.',
    icon: 'chart-line',
    metaTitle: 'Free Financial Calculators — Loan, Mortgage, Tax & Investment Tools | AIO Calculator',
    metaDescription: 'Free online financial calculators for mortgages, auto loans, investments, taxes, and retirement. Instant calculations in your browser with no sign-up or data upload required.'
  },
  health: {
    id: 'health',
    name: 'Fitness and Health Calculators',
    slug: 'fitness-health-calculators',
    description: 'Accurately assess your body composition, daily calorie needs, TDEE, pregnancy milestones, and workout energy burn with evidence-backed health formulas.',
    icon: 'heart-pulse',
    metaTitle: 'Free Fitness & Health Calculators — BMI, TDEE, Calorie & Body Fat Tools | AIO Calculator',
    metaDescription: 'Free online fitness and health calculators for BMI, ideal weight, body fat percentage, TDEE, calorie deficit, and pregnancy due dates. Scientifically validated formulas.'
  },
  math: {
    id: 'math',
    name: 'Math Calculators',
    slug: 'math-calculators',
    description: 'Solve arithmetic, algebra, geometry, statistics, GPA, and probability problems with step-by-step methods and instant interactive tools.',
    icon: 'calculator',
    metaTitle: 'Free Online Math Calculators — Basic, Scientific, Algebra & Statistics | AIO Calculator',
    metaDescription: 'Free online math calculators covering scientific math, algebra equations, fractions, GPA, statistics, geometry, and probability. Works seamlessly in your browser.'
  },
  everyday: {
    id: 'everyday',
    name: 'Everyday Tools',
    slug: 'everyday-tools',
    description: 'Practical daily utilities for unit conversion, date and time differences, tips, fuel costs, secure password generation, and sleep cycle optimization.',
    icon: 'wrench',
    metaTitle: 'Free Everyday Utility Calculators — Unit, Time, Tip & Fuel Tools | AIO Calculator',
    metaDescription: 'Free everyday utility calculators for unit conversion, age, date differences, fuel cost, tip calculation, password generation, and sleep cycles.'
  }
};
