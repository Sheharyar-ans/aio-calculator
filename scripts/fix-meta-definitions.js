import fs from 'fs';

let content = fs.readFileSync('./scripts/meta-definitions.js', 'utf8');

const replacements = [
  // index
  {
    from: "title: 'AIO Calculator: 100+ Free Online Calculators | AIO Calculator',",
    to: "title: 'AIO Calculator: 100+ Free Online Tools | AIO Calculator',"
  },
  // fitness-health-calculators
  {
    from: "title: 'Health and Fitness Calculators: BMI and TDEE | AIO Calculator',",
    to: "title: 'Health and Fitness Calculators: BMI & TDEE | AIO Calculator',"
  },
  // everyday-tools
  {
    from: "title: 'Everyday Utility Tools: Time, Units and Fuel | AIO Calculator',",
    to: "title: 'Everyday Utility Tools: Time, Fuel & Units | AIO Calculator',"
  },
  // compound-interest-calculator
  {
    from: "title: 'Compound Interest Calculator: Savings Growth | AIO Calculator',",
    to: "title: 'Compound Interest Calculator: Growth Tool | AIO Calculator',"
  },
  // debt-payoff-calculator
  {
    from: "title: 'Debt Payoff Calculator: Snowball vs Avalanche | AIO Calculator',",
    to: "title: 'Debt Payoff Calculator: Plan Free Journey | AIO Calculator',"
  },
  // calorie-intake-deficit-tracker
  {
    from: "title: 'Calorie Deficit Calculator: Weight Loss Goal | AIO Calculator',",
    to: "title: 'Calorie Deficit Calculator: Weight Loss | AIO Calculator',"
  },
  // steps-to-km-converter
  {
    from: "title: 'Steps to Km Converter: Distance and Calories | AIO Calculator',",
    to: "title: 'Steps to Km Converter: Distance & Calorie | AIO Calculator',"
  },
  // algebra-equations-calculator desc
  {
    from: "desc: 'Solve linear and quadratic algebraic equations with step-by-step discriminant working using our free algebra equations calculator tool.'",
    to: "desc: 'Solve linear and quadratic algebraic equations with step-by-step discriminant working using our free online algebra equations calculator tool today.'"
  },
  // geometry-calculator
  {
    from: "title: 'Geometry Calculator: Area, Volume, Perimeter | AIO Calculator',",
    to: "title: 'Geometry Calculator: Area & Volume Tool | AIO Calculator',"
  },
  {
    from: "desc: 'Calculate area, perimeter, surface area, and volume for 2D circles and 3D geometric shapes with our free step-by-step geometry calculator.'",
    to: "desc: 'Calculate area, perimeter, surface area, and volume for 2D circles and 3D geometric shapes with our free step-by-step online geometry calculator.'"
  },
  // average-statistics-calculator
  {
    from: "title: 'Average and Statistics Calculator: Mean Mode | AIO Calculator',",
    to: "title: 'Average & Statistics Calculator: Mean & Mode | AIO Calculator',"
  },
  // probability-data-calculator desc
  {
    from: "desc: 'Calculate combinations (nCr), permutations (nPr), and single or compound event probabilities with our free academic probability calculator.'",
    to: "desc: 'Calculate combinations (nCr), permutations (nPr), and single or compound event probabilities with our free online academic probability calculator.'"
  },
  // fraction-calculator
  {
    from: "title: 'Fraction Calculator: Add, Multiply Fractions | AIO Calculator',",
    to: "title: 'Fraction Calculator: Add & Multiply Tool | AIO Calculator',"
  },
  // percentage-calculator
  {
    from: "title: 'Percentage Calculator: Increase and Decrease | AIO Calculator',",
    to: "title: 'Percentage Calculator: Increase & Decrease | AIO Calculator',"
  },
  {
    from: "desc: 'Calculate percentage of a number, percentage increase or decrease, and reverse percentages with our free interactive percentage calculator.'",
    to: "desc: 'Calculate percentage of a number, percentage increase or decrease, and reverse percentages with our free interactive online percentage calculator.'"
  },
  // time-date-calculator
  {
    from: "title: 'Time and Date Calculator: Days Between Dates | AIO Calculator',",
    to: "title: 'Time & Date Calculator: Days Between Dates | AIO Calculator',"
  },
  // finance-shopping-tools desc
  {
    from: "desc: 'Calculate restaurant tips, bill splits, percentage discounts, and sales tax with our free all-in-one finance and shopping utility tools.'",
    to: "desc: 'Calculate restaurant tips, bill splits, percentage discounts, and sales tax with our free all-in-one finance and shopping utility calculators.'"
  },
  // home-vehicle-tools
  {
    from: "title: 'Home and Vehicle Tools: Fuel and Electricity | AIO Calculator',",
    to: "title: 'Home and Vehicle Tools: Fuel & Electricity | AIO Calculator',"
  },
  // tech-security-tools
  {
    from: "title: 'Tech Security Tools: Password and Subnet CIDR | AIO Calculator',",
    to: "title: 'Tech Security Tools: Password & Subnet CIDR | AIO Calculator',"
  },
  // sleep-calculator desc
  {
    from: "desc: 'Calculate optimal bedtimes and wake-up schedules based on natural 90-minute sleep cycles with our free sleep calculator. Wake up refreshed.'",
    to: "desc: 'Calculate optimal bedtimes and wake-up schedules based on natural 90-minute sleep cycles with our free online sleep calculator. Wake up refreshed.'"
  }
];

for (const r of replacements) {
  if (!content.includes(r.from)) {
    console.error('Target not found:', r.from);
  } else {
    content = content.replace(r.from, r.to);
  }
}

fs.writeFileSync('./scripts/meta-definitions.js', content);
console.log('Updated meta definitions successfully.');
