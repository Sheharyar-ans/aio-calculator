import type { CalculatorDefinition } from './types';

export const healthCalculators: CalculatorDefinition[] = [
  {
    slug: 'bmi-ideal-weight-calculator',
    name: 'BMI and Ideal Weight Calculator',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Calculate your Body Mass Index (BMI) and discover your healthy ideal body weight range across Devine, Robinson, and Hamwi formulas.',
    metaTitle: 'BMI and Ideal Weight Calculator — Free Online Body Mass & Ideal Weight Tool',
    metaDescription: 'Free online BMI and ideal weight calculator. Calculate your exact Body Mass Index, WHO health category, and healthy weight range using metric or imperial units.',
    primaryKeyword: 'BMI calculator',
    secondaryKeywords: ['ideal weight calculator', 'BMI and ideal weight', 'healthy BMI range'],
    directAnswer: 'Body Mass Index (BMI) is a screening metric that evaluates body weight relative to height to assess whether an individual falls into an underweight, normal, overweight, or obese classification. For adults, a healthy BMI ranges between 18.5 and 24.9 according to the World Health Organization (WHO), while ideal body weight formulas estimate target healthy weights based on biological sex and height.',
    formulaHtml: `
      <p>Standard Body Mass Index (BMI) formulas:</p>
      <div class="math-formula">
        <code>Metric: BMI = weight (kg) ÷ [height (m)]²</code><br />
        <code>Imperial: BMI = [weight (lbs) ÷ (height (in))²] × 703</code>
      </div>
      <p>Devine Ideal Body Weight (IBW) Formula:</p>
      <ul>
        <li><strong>Men:</strong> IBW (kg) = 50.0 kg + 2.3 kg × (height in inches - 60)</li>
        <li><strong>Women:</strong> IBW (kg) = 45.5 kg + 2.3 kg × (height in inches - 60)</li>
      </ul>
      <p>WHO Adult BMI Classifications: Underweight (&lt; 18.5), Normal weight (18.5 – 24.9), Overweight (25.0 – 29.9), Obesity Class I (30.0 – 34.9), Class II (35.0 – 39.9), Class III (≥ 40.0).</p>
    `,
    workedExample: {
      title: 'Adult Male: 5 ft 10 in (70 inches / 1.778 m) weighing 172 lbs (78.0 kg)',
      inputs: {
        'Height': '5 ft 10 in (70 inches / 1.778 m)',
        'Weight': '172 lbs (78.0 kg)',
        'Biological Sex': 'Male'
      },
      calculationHtml: `
        <p>1. Metric BMI = 78.0 ÷ (1.778)² = 78.0 ÷ 3.1613 = 24.67 kg/m²</p>
        <p>2. Imperial Check = [172 ÷ (70)²] × 703 = [172 ÷ 4900] × 703 = 24.68 kg/m²</p>
        <p>3. Category = <strong>Normal Weight (Healthy)</strong> (18.5 to 24.9 range)</p>
        <p>4. Devine Ideal Body Weight = 50.0 + 2.3 × (70 - 60) = 50.0 + 23.0 = 73.0 kg (160.9 lbs)</p>
        <p>5. WHO Healthy Weight Range for 5 ft 10 in = 128.9 lbs to 173.5 lbs (58.5 kg to 78.7 kg)</p>
      `,
      result: 'BMI: 24.7 (Normal Weight) | Devine Ideal Weight: 161 lbs | Healthy Range: 129–174 lbs'
    },
    steps: [
      'Select your preferred measurement units (Imperial: ft/in and lbs, or Metric: cm and kg).',
      'Enter your height, current body weight, and biological sex.',
      'Review your calculated BMI number, WHO classification badge, and color-coded gauge.',
      'Compare your current weight against the medically recognized ideal body weight formulas.'
    ],
    limitations: [
      'BMI does not distinguish between muscle mass and fat tissue; muscular athletes and bodybuilders may register as "overweight" or "obese" despite very low body fat.',
      'BMI does not measure visceral fat distribution around abdominal organs, which carries higher cardiovascular risk.',
      'Not calibrated for pregnant women, growing children/teens (who require CDC age-growth percentiles), or the elderly.'
    ],
    faqs: [
      {
        question: 'What is considered a healthy BMI range?',
        answer: 'The World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC) define a normal, healthy adult BMI as 18.5 to 24.9 kg/m². BMIs below 18.5 are classified as underweight, 25.0 to 29.9 as overweight, and 30.0 or above as obese.'
      },
      {
        question: 'Why does BMI overestimate risk for muscular individuals?',
        answer: 'BMI relies solely on height and total weight. Because muscle tissue is substantially denser than adipose fat tissue, athletic individuals with high muscularity often have high BMIs despite possessing low, healthy body fat levels.'
      },
      {
        question: 'What is the Devine formula for ideal body weight?',
        answer: 'Developed in 1974 by Dr. Ben Devine, the formula calculates baseline ideal weight starting at 50 kg for men and 45.5 kg for women at 5 feet tall, adding 2.3 kg for each additional inch of height. It is widely used in clinical pharmacology for medication dosing.'
      },
      {
        question: 'How does this tool differ from the BMI and Body Fat Calculator?',
        answer: 'While this tool calculates height-to-weight BMI and theoretical ideal weight, our BMI and Body Fat Calculator incorporates body circumference measurements (neck, waist, hips) to estimate true body fat percentage and lean muscle mass.'
      },
      {
        question: 'How much weight do I need to lose to drop one BMI point?',
        answer: 'For an average adult height of 5 ft 10 in (178 cm), approximately 6.5 to 7.0 pounds (3.0 to 3.2 kg) of weight loss will reduce your BMI by exactly 1.0 point.'
      }
    ],
    relatedSlugs: ['bmi-body-fat-calculator', 'calorie-intake-deficit-tracker', 'calorie-macro-calculator', 'tdee-calculator'],
    sources: [
      {
        claim: 'World Health Organization (WHO) adult body mass index criteria and classifications.',
        source: 'WHO Obesity and Overweight Factsheet',
        url: 'https://www.who.int',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'bmi-ideal-weight',
    initialDefaults: {
      unit: 'imperial',
      heightFeet: 5,
      heightInches: 10,
      weightLbs: 172,
      gender: 'male'
    }
  },
  {
    slug: 'bmi-body-fat-calculator',
    name: 'BMI and Body Fat Calculator',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Estimate your body fat percentage, fat mass, and lean muscle tissue using the validated U.S. Navy circumference method.',
    metaTitle: 'Body Fat Percentage Calculator — Free U.S. Navy Method & BMI Tool',
    metaDescription: 'Free online body fat calculator. Estimate body fat percentage, lean body mass, and fat mass using the validated U.S. Navy circumference method for men and women.',
    primaryKeyword: 'body fat percentage calculator',
    secondaryKeywords: ['BMI body fat calculator', 'Navy body fat method', 'body fat estimate'],
    directAnswer: 'A body fat percentage calculator estimates the proportion of your total body weight composed of adipose tissue relative to lean muscle, bone, and water. Using the scientifically validated U.S. Navy circumference method based on neck, waist, hip, and height measurements, it provides a much more accurate evaluation of physical fitness and health risks than height-weight BMI alone.',
    formulaHtml: `
      <p>Hodgdon-Beckett (U.S. Navy) Body Fat Equations (measurements in centimeters):</p>
      <div class="math-formula">
        <code>Men: % Body Fat = 495 ÷ [1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)] - 450</code><br />
        <code>Women: % Body Fat = 495 ÷ [1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)] - 450</code><br />
        <code>Fat Mass = Total Weight × (% Body Fat ÷ 100)</code><br />
        <code>Lean Body Mass = Total Weight - Fat Mass</code>
      </div>
    `,
    workedExample: {
      title: 'Adult Male: 180 lbs, 70 inches tall, 15.5 in neck, 34.0 in waist',
      inputs: {
        'Biological Sex': 'Male',
        'Height': '70 inches (177.8 cm)',
        'Weight': '180 lbs (81.65 kg)',
        'Neck Circumference': '15.5 inches (39.37 cm)',
        'Waist Circumference': '34.0 inches (86.36 cm)'
      },
      calculationHtml: `
        <p>1. Waist - Neck = 86.36 cm - 39.37 cm = 46.99 cm</p>
        <p>2. log10(46.99) = 1.6720; log10(177.8) = 2.2500</p>
        <p>3. Denominator = 1.0324 - (0.19077 × 1.6720) + (0.15456 × 2.2500) = 1.0609</p>
        <p>4. Body Fat % = (495 ÷ 1.0609) - 450 = 466.58 - 450 = 16.58% (Fitness Category)</p>
        <p>5. Fat Mass = 180 lbs × 0.1658 = 29.8 lbs fat</p>
        <p>6. Lean Body Mass = 180 lbs - 29.8 lbs = 150.2 lbs muscle, bone & water</p>
      `,
      result: 'Body Fat: 16.6% (Fitness Category) | Fat Mass: 29.8 lbs | Lean Mass: 150.2 lbs'
    },
    steps: [
      'Select your biological sex (anatomical circumference distribution differs between males and females).',
      'Measure your neck circumference at the narrowest point below the larynx.',
      'Measure your waist circumference horizontally across the navel (men) or natural narrowest waist (women).',
      'Women: measure hip circumference at the widest horizontal point across the buttocks.',
      'Enter your height and weight to calculate body fat %, lean mass, and ACE fitness category.'
    ],
    limitations: [
      'Tape measurement tension errors of even 0.5 inches can alter calculated body fat percentage by 1% to 2%.',
      'Dual-Energy X-ray Absorptiometry (DEXA) and hydrostatic weighing remain clinical gold standards with narrower margins of error.'
    ],
    faqs: [
      {
        question: 'What is a healthy body fat percentage for men and women?',
        answer: 'The American Council on Exercise (ACE) defines healthy fitness body fat ranges as 14% to 17% for men and 21% to 24% for women. An acceptable general health range is 18% to 24% for men and 25% to 31% for women.'
      },
      {
        question: 'Why is body fat percentage better than BMI?',
        answer: 'BMI measures total body mass relative to height, treating muscle and fat identically. Body fat percentage isolates adipose fat tissue from lean muscle, allowing you to accurately gauge health, metabolic fitness, and body composition changes.'
      },
      {
        question: 'How accurate is the U.S. Navy body fat formula?',
        answer: 'When measured carefully with a non-elastic tape measure, clinical studies show the U.S. Navy formula typically correlates within 3% to 4% of DEXA scan measurements for the general population.'
      },
      {
        question: 'What is essential body fat?',
        answer: 'Essential fat is the minimum fat necessary for physiological survival, nerve insulation, hormone synthesis, and organ protection: approximately 2% to 5% for men and 10% to 13% for women.'
      },
      {
        question: 'How does this tool connect to the Calorie and Macro Calculator?',
        answer: 'Knowing your lean body mass allows you to use the Katch-McArdle formula inside our Calorie and Macro Calculator for exceptionally precise basal metabolic rate (BMR) calculations.'
      }
    ],
    relatedSlugs: ['bmi-ideal-weight-calculator', 'calorie-macro-calculator', 'tdee-calculator', 'calorie-intake-deficit-tracker'],
    sources: [
      {
        claim: 'U.S. Navy circumference body fat evaluation equations and ACE body composition standards.',
        source: 'Naval Health Research Center & American Council on Exercise',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'body-fat',
    initialDefaults: {
      gender: 'male',
      unit: 'imperial',
      heightInches: 70,
      weightLbs: 180,
      neckInches: 15.5,
      waistInches: 34.0,
      hipInches: 38.0
    }
  },
  {
    slug: 'calorie-intake-deficit-tracker',
    name: 'Calorie Intake / Deficit Tracker',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Calculate target daily calorie intake, calorie deficits for safe fat loss, and projected weekly weight change timelines.',
    metaTitle: 'Calorie Intake & Deficit Tracker — Free Daily Calorie Target Tool',
    metaDescription: 'Free online calorie deficit tracker. Calculate your daily calorie intake target for sustainable weight loss, mild deficit, or lean muscle gain with target completion dates.',
    primaryKeyword: 'calorie intake calculator',
    secondaryKeywords: ['calorie deficit calculator', 'daily calorie needs', 'calorie deficit for weight loss'],
    directAnswer: 'A calorie deficit tracker calculates the specific daily caloric intake needed to produce safe, sustainable fat loss by creating a negative energy balance below your Total Daily Energy Expenditure (TDEE). A consistent daily deficit of 500 calories equates to approximately one pound of body fat lost per week, balancing fat reduction while preserving lean muscle mass.',
    formulaHtml: `
      <p>Energy balance and calorie deficit equations:</p>
      <div class="math-formula">
        <code>Daily Maintenance Calories = TDEE (Total Daily Energy Expenditure)</code><br />
        <code>Target Intake = TDEE - Planned Daily Caloric Deficit</code><br />
        <code>Projected Weekly Weight Loss (lbs) = (Daily Deficit × 7) ÷ 3,500 kcal</code>
      </div>
      <p>Recommended Safe Deficit Tiers:</p>
      <ul>
        <li><strong>Mild Deficit (0.5 lb/week):</strong> TDEE - 250 kcal/day (sustainable, minimal hunger).</li>
        <li><strong>Moderate Deficit (1.0 lb/week):</strong> TDEE - 500 kcal/day (gold standard for fat loss).</li>
        <li><strong>Aggressive Deficit (1.5–2.0 lbs/week):</strong> TDEE - 750 to 1,000 kcal/day (requires high protein to spare muscle).</li>
      </ul>
    `,
    workedExample: {
      title: 'Targeting 1 lb/Week Fat Loss for a 30-Year-Old Female (TDEE = 2,150 kcal)',
      inputs: {
        'Current Maintenance TDEE': '2,150 kcal / day',
        'Target Weight Goal': 'Lose 15 lbs',
        'Chosen Deficit': 'Moderate (500 kcal / day deficit)'
      },
      calculationHtml: `
        <p>1. Target Daily Intake = 2,150 - 500 = 1,650 calories / day</p>
        <p>2. Weekly Caloric Deficit = 500 × 7 = 3,500 calories</p>
        <p>3. Expected Weight Loss Rate = 3,500 ÷ 3,500 = 1.0 lb / week</p>
        <p>4. Projected Timeline to lose 15 lbs = 15 weeks (approx. 3.5 months)</p>
      `,
      result: 'Daily Target: 1,650 kcal/day (Loses 1.0 lb/week; Goal reached in 15 weeks)'
    },
    steps: [
      'Enter your biological sex, age, height, and current weight.',
      'Select your physical daily activity level (sedentary, lightly active, moderate, very active).',
      'Choose your target weight loss rate (0.5 lb, 1.0 lb, or 1.5 lbs per week).',
      'Review your exact target daily calorie intake, projected goal date, and macro guidelines.'
    ],
    limitations: [
      'Metabolic adaptation occurs as body weight decreases; maintenance TDEE will decline by ~10-15 kcal per pound lost, requiring periodic calorie adjustments.',
      'Women should generally not consume fewer than 1,200 calories/day and men not fewer than 1,500 calories/day without physician supervision.'
    ],
    faqs: [
      {
        question: 'What is a calorie deficit?',
        answer: 'A calorie deficit occurs when you consume fewer calories from food and drink than your body expends for baseline metabolic bodily functions and physical activity. To bridge the energy shortfall, your body metabolizes stored adipose body fat.'
      },
      {
        question: 'Is the 3,500-calorie rule for one pound of fat accurate?',
        answer: 'While one pound of human adipose tissue stores approximately 3,500 kilocalories of chemical energy, real-world weight loss is dynamic and non-linear due to water weight fluctuations, metabolic adaptation, and glycogen shifts.'
      },
      {
        question: 'How do I prevent muscle loss during a calorie deficit?',
        answer: 'To preserve lean muscle mass while losing fat, consume sufficient dietary protein (0.7 to 1.0 grams per pound of body weight daily) and engage in consistent resistance strength training 2 to 4 times per week.'
      },
      {
        question: 'What happens if my calorie deficit is too aggressive?',
        answer: 'Deficits exceeding 1,000 calories/day trigger severe hunger, hormonal disruption (low thyroid, elevated cortisol), fatigue, muscle loss, and gallstone risks, frequently leading to diet abandonment and rebound weight regain.'
      },
      {
        question: 'How does this tool connect to the Calorie and Macro Calculator?',
        answer: 'Once this tracker identifies your target calorie intake, visit our Calorie and Macro Calculator to distribute those calories into optimal grams of protein, carbohydrates, and healthy fats.'
      }
    ],
    relatedSlugs: ['calorie-macro-calculator', 'tdee-calculator', 'bmi-ideal-weight-calculator', 'fitness-workout-calculator'],
    sources: [
      {
        claim: 'Centers for Disease Control and Prevention guidelines for safe, sustainable weight management.',
        source: 'CDC Healthy Weight Planning',
        url: 'https://www.cdc.gov/healthyweight',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'calorie-deficit',
    initialDefaults: {
      gender: 'female',
      age: 30,
      heightInches: 65,
      weightLbs: 155,
      activityLevel: 'light',
      goalRate: '1.0'
    }
  },
  {
    slug: 'calorie-macro-calculator',
    name: 'Calorie and Macro Calculator',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Calculate your daily calorie needs, BMR, TDEE, and optimal macronutrient split (protein, carbs, fats) for your fitness goals.',
    metaTitle: 'Calorie and Macro Calculator — Free TDEE & Macronutrient Split Tool',
    metaDescription: 'Free online calorie and macro calculator. Calculate your BMR, TDEE, and custom daily grams of protein, carbohydrates, and fats for fat loss, maintenance, or muscle gain.',
    primaryKeyword: 'calorie calculator',
    secondaryKeywords: ['macro calculator', 'TDEE', 'BMR', 'protein carbs fat calculator'],
    directAnswer: 'A calorie and macro calculator determines your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and optimal distribution of daily calories across the three primary macronutrients: protein, carbohydrates, and dietary fats. Tailoring your macros ensures you maintain energy levels and retain lean muscle while hitting your body composition targets.',
    formulaHtml: `
      <p>Mifflin-St Jeor Equation for Basal Metabolic Rate (BMR):</p>
      <div class="math-formula">
        <code>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</code><br />
        <code>Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</code><br />
        <code>TDEE = BMR × Activity Multiplier (1.2 to 1.9)</code>
      </div>
      <p>Macronutrient Energy Density: Protein = 4 kcal/g, Carbohydrates = 4 kcal/g, Fats = 9 kcal/g.</p>
    `,
    workedExample: {
      title: 'Fitness Macro Plan (Male, 28 yrs, 180 lbs / 81.6 kg, 5 ft 11 in / 180 cm, Moderately Active, Muscle Gain)',
      inputs: {
        'Sex': 'Male',
        'Age': '28',
        'Height': '180 cm (5 ft 11 in)',
        'Weight': '81.6 kg (180 lbs)',
        'Activity Level': 'Moderately Active (exercise 3-5 days/week: 1.55 multiplier)',
        'Goal': 'Lean Muscle Gain (+250 kcal surplus)'
      },
      calculationHtml: `
        <p>1. BMR = (10 × 81.6) + (6.25 × 180) - (5 × 28) + 5 = 816 + 1125 - 140 + 5 = 1,806 kcal</p>
        <p>2. TDEE = 1,806 × 1.55 = 2,800 kcal / day maintenance</p>
        <p>3. Target Calories (Surplus) = 2,800 + 250 = 3,050 kcal / day</p>
        <p>4. <strong>Protein (1.0 g/lb = 180g):</strong> 180g × 4 kcal = 720 kcal (23.6%)</p>
        <p>5. <strong>Fats (0.4 g/lb = 72g):</strong> 72g × 9 kcal = 648 kcal (21.2%)</p>
        <p>6. <strong>Carbs (Remaining):</strong> (3,050 - 720 - 648) ÷ 4 kcal = 1,682 ÷ 4 = 420g carbs (55.2%)</p>
      `,
      result: 'Daily Target: 3,050 kcal | Protein: 180g (720 kcal) | Fats: 72g (648 kcal) | Carbs: 420g (1,682 kcal)'
    },
    steps: [
      'Enter your age, sex, height, weight, and general weekly exercise activity.',
      'Select your goal: Fat Loss (deficit), Maintenance, or Muscle Building (surplus).',
      'Choose a macro split style (Balanced 30/40/30, High Protein 35/40/25, Low Carb / Keto).',
      'View your customized daily gram targets for protein, carbohydrates, and healthy fats.'
    ],
    limitations: [
      'Physical activity multipliers are estimates; real metabolic rates vary based on Non-Exercise Activity Thermogenesis (NEAT).',
      'Individuals with kidney or liver conditions should consult their physician before adopting high-protein dietary protocols.'
    ],
    faqs: [
      {
        question: 'What are macronutrients?',
        answer: 'Macronutrients (macros) are the three primary nutritional categories your body requires in large quantities for energy and survival: proteins (tissue repair and enzymes, 4 kcal/g), carbohydrates (primary fuel for brain and muscles, 4 kcal/g), and dietary fats (hormone production and cellular health, 9 kcal/g).'
      },
      {
        question: 'How much protein do I need per day?',
        answer: 'The Recommended Dietary Allowance (RDA) minimum is 0.8g per kg of body weight (0.36g/lb) to prevent deficiency. For active individuals and resistance trainers seeking muscle preservation or growth, exercise science consensus recommends 1.6 to 2.2g per kg (0.7 to 1.0g per pound).'
      },
      {
        question: 'What is the Mifflin-St Jeor formula?',
        answer: 'Published in 1990 in the American Journal of Clinical Nutrition, the Mifflin-St Jeor formula is clinically validated as the most reliable predictive equation for measuring Basal Metabolic Rate (BMR) in non-athletic and athletic adults.'
      },
      {
        question: 'Does this page include a standalone TDEE mode?',
        answer: 'Yes. This calculator incorporates a full integrated TDEE calculation mode. You can also visit our dedicated TDEE Calculator page for standalone resting vs active energy breakdowns.'
      },
      {
        question: 'Can I track macros without counting calories?',
        answer: 'Because every gram of protein and carb contains 4 calories and fat contains 9 calories, tracking your macros automatically controls your caloric intake while ensuring optimal nutritional balance.'
      }
    ],
    relatedSlugs: ['tdee-calculator', 'calorie-intake-deficit-tracker', 'bmi-ideal-weight-calculator', 'fitness-workout-calculator'],
    sources: [
      {
        claim: 'Mifflin-St Jeor energy expenditure validation study.',
        source: 'American Journal of Clinical Nutrition',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'calorie-macro',
    initialDefaults: {
      gender: 'male',
      age: 28,
      heightCm: 180,
      weightKg: 81.6,
      activity: 'moderate',
      goal: 'maintenance',
      split: 'balanced'
    }
  },
  {
    slug: 'tdee-calculator',
    name: 'TDEE Calculator',
    category: 'health',
    badge: 'Tier 1',
    shortDescription: 'Calculate your Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) with Mifflin-St Jeor and Katch-McArdle models.',
    metaTitle: 'TDEE Calculator — Free Total Daily Energy Expenditure & BMR Tool',
    metaDescription: 'Free online TDEE calculator. Discover your exact Total Daily Energy Expenditure, Basal Metabolic Rate, and maintenance calorie burn across multiple activity tiers.',
    primaryKeyword: 'TDEE calculator',
    secondaryKeywords: ['BMR calculator', 'Mifflin-St Jeor', 'macros calculator', 'protein calculator'],
    directAnswer: 'A TDEE calculator determines your Total Daily Energy Expenditure—the total number of calories your body burns in a 24-hour period across basal metabolic function, physical exercise, and daily movement. Knowing your precise TDEE is the essential scientific starting point for maintaining, losing, or gaining body weight.',
    formulaHtml: `
      <p>Components of Total Daily Energy Expenditure:</p>
      <div class="math-formula">
        <code>TDEE = BMR + TEF (10%) + EAT (Exercise) + NEAT (Non-Exercise Activity)</code><br />
        <code>Standard Multipliers: Sedentary (1.2) | Light (1.375) | Moderate (1.55) | Heavy (1.725) | Athlete (1.9)</code>
      </div>
    `,
    workedExample: {
      title: 'Active Male Professional (32 yrs, 6 ft 0 in / 183 cm, 185 lbs / 84 kg, Lightly Active)',
      inputs: {
        'Age': '32',
        'Height': '183 cm (6 ft 0 in)',
        'Weight': '84 kg (185 lbs)',
        'Sex': 'Male',
        'Activity': 'Lightly Active (1.375x)'
      },
      calculationHtml: `
        <p>1. BMR = (10 × 84) + (6.25 × 183) - (5 × 32) + 5 = 840 + 1143.75 - 160 + 5 = 1,828.75 kcal</p>
        <p>2. TDEE = 1,828.75 × 1.375 = 2,514.5 kcal / day</p>
        <p>3. Maintenance Calories = 2,515 kcal/day</p>
        <p>4. Fat Loss Target (-500 kcal) = 2,015 kcal/day</p>
        <p>5. Muscle Building Target (+300 kcal) = 2,815 kcal/day</p>
      `,
      result: 'BMR: 1,829 kcal/day | Maintenance TDEE: 2,515 kcal/day'
    },
    steps: [
      'Enter your age, biological sex, height, and body weight.',
      'Select your physical activity level honestly based on your weekly routine.',
      'Optionally enter known body fat % to unlock the Katch-McArdle formula.',
      'Review your BMR, TDEE, and maintenance versus cut/bulk caloric thresholds.'
    ],
    limitations: [
      'Fitness trackers frequently overestimate exercise calories burned by 20% to 40%.',
      'Thyroid conditions, prior extreme dieting, and hormonal factors can affect actual metabolic expenditure.'
    ],
    faqs: [
      {
        question: 'What is the difference between BMR and TDEE?',
        answer: 'BMR (Basal Metabolic Rate) is the energy your body burns strictly at rest to keep vital organs functioning (heart, lungs, brain). TDEE (Total Daily Energy Expenditure) is your BMR plus all additional energy burned through walking, working, digesting food, and exercising.'
      },
      {
        question: 'How do I choose the right activity multiplier?',
        answer: 'Most desk workers who exercise 3 to 4 times a week are "Lightly Active" (1.375). Only people with physically demanding jobs (construction, mail delivery) or athletes training twice daily are "Very Active" (1.725+).'
      },
      {
        question: 'What is NEAT in energy expenditure?',
        answer: 'NEAT stands for Non-Exercise Activity Thermogenesis. It represents all calories burned doing non-exercise movement: fidgeting, pacing, taking the stairs, typing, and yard work. NEAT accounts for significant differences in metabolism between individuals.'
      },
      {
        question: 'How often should I recalculate my TDEE?',
        answer: 'Recalculate your TDEE every time you lose or gain 5 to 10 pounds (2 to 5 kg), as a smaller body requires fewer calories to operate and exercise.'
      },
      {
        question: 'How does this page relate to the Calorie and Macro Calculator?',
        answer: 'This page focuses specifically on energy expenditure science and activity tier breakdowns. For detailed macronutrient gram targets (protein, carbs, fat splits), visit our Calorie and Macro Calculator.'
      }
    ],
    relatedSlugs: ['calorie-macro-calculator', 'calorie-intake-deficit-tracker', 'bmi-ideal-weight-calculator', 'fitness-workout-calculator'],
    sources: [
      {
        claim: 'Clinical validation of Mifflin-St Jeor and Katch-McArdle metabolic predictive equations.',
        source: 'Journal of the Academy of Nutrition and Dietetics',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'tdee',
    initialDefaults: {
      gender: 'male',
      age: 32,
      heightCm: 183,
      weightKg: 84,
      activity: 'light'
    }
  },
  {
    slug: 'fitness-workout-calculator',
    name: 'Fitness and Workout Calculator',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Calculate calories burned during workouts using metabolic equivalents (METs) and find your target heart rate training zones.',
    metaTitle: 'Fitness & Workout Calculator — Free Exercise Calories & Heart Rate Zones',
    metaDescription: 'Free online fitness and workout calculator. Calculate exercise calories burned across 30+ activities using MET values and determine your Karvonen target heart rate zones.',
    primaryKeyword: 'fitness calculator',
    secondaryKeywords: ['workout calculator', 'exercise calorie calculator', 'workout planning'],
    directAnswer: 'A fitness and workout calculator estimates the total calories burned during specific physical activities using scientific Metabolic Equivalent of Task (MET) values, and determines your target aerobic training heart rate zones using the Karvonen formula. It helps athletes optimize cardiovascular intensity and energy expenditure.',
    formulaHtml: `
      <p>Calorie burn based on Metabolic Equivalent of Task (MET):</p>
      <div class="math-formula">
        <code>Calories Burned = [MET × 3.5 × weight (kg) ÷ 200] × duration (minutes)</code>
      </div>
      <p>Target Heart Rate (Karvonen Method):</p>
      <div class="math-formula">
        <code>Max Heart Rate (HRmax) = 220 - Age (or Gellish formula: 207 - 0.7 × Age)</code><br />
        <code>Heart Rate Reserve (HRR) = HRmax - Resting Heart Rate</code><br />
        <code>Target Heart Rate = (HRR × % Intensity) + Resting Heart Rate</code>
      </div>
    `,
    workedExample: {
      title: '45-Minute Jogging Session (MET = 7.0) for a 165 lb (74.8 kg) Person',
      inputs: {
        'Activity': 'Jogging / Running (5 mph, MET 7.0)',
        'Body Weight': '165 lbs (74.8 kg)',
        'Duration': '45 minutes',
        'Age': '35 (HRmax ≈ 185 bpm, Resting HR = 65 bpm)'
      },
      calculationHtml: `
        <p>1. Calories Burned = [7.0 × 3.5 × 74.8 ÷ 200] × 45 = [9.163] × 45 = 412.3 kcal</p>
        <p>2. Zone 2 Endurance (60-70% HRR):</p>
        <p>   - 60% = (185 - 65) × 0.60 + 65 = 137 bpm</p>
        <p>   - 70% = (185 - 65) × 0.70 + 65 = 149 bpm</p>
        <p>3. Target Zone 2 Window = 137 to 149 bpm</p>
      `,
      result: 'Calories Burned: 412 kcal | Aerobic Zone 2 Window: 137–149 bpm'
    },
    steps: [
      'Enter your current body weight and age.',
      'Select your physical exercise activity from the comprehensive MET database.',
      'Enter your workout duration in minutes.',
      'Optionally input resting heart rate to view customized Zone 1 to Zone 5 training intensities.'
    ],
    limitations: [
      'Calorie burn varies with individual fitness efficiency, terrain, ambient temperature, and muscular effort.',
      'Beta-blocker medications alter heart rate response and render standard max heart rate formulas inaccurate.'
    ],
    faqs: [
      {
        question: 'What is a MET (Metabolic Equivalent of Task)?',
        answer: 'One MET represents the rate of energy expenditure while sitting quietly at rest (equivalent to approximately 3.5 milliliters of oxygen per kilogram of body weight per minute, or 1 kcal/kg/hour). An activity with a MET of 8.0 burns 8 times more energy than sitting still.'
      },
      {
        question: 'What is Zone 2 cardio training?',
        answer: 'Zone 2 cardio is low-intensity, steady-state training performed at 60% to 70% of heart rate reserve. It stimulates mitochondrial density and maximizes fatty acid oxidation without creating excessive neuromuscular fatigue.'
      },
      {
        question: 'How accurate are treadmill and wearable calorie counters?',
        answer: 'Stanford University studies have shown that consumer fitness trackers and cardio machines frequently overestimate exercise caloric burn by 15% to 35%. Using conservative MET estimates provides a more reliable baseline.'
      },
      {
        question: 'Does lifting weights burn as many calories as cardio?',
        answer: 'Cardio burns more calories during the active workout session, but resistance training builds metabolically active lean muscle mass and stimulates excess post-exercise oxygen consumption (EPOC), burning calories for hours after training.'
      },
      {
        question: 'How does this tool connect to the Steps to Km Converter?',
        answer: 'If your primary exercise is walking or hiking, use our Steps to Km Converter to translate your daily pedometer step totals into distance traveled and calories burned.'
      }
    ],
    relatedSlugs: ['steps-to-km-converter', 'calorie-macro-calculator', 'tdee-calculator', 'calorie-intake-deficit-tracker'],
    sources: [
      {
        claim: 'Compendium of Physical Activities MET database standards.',
        source: 'Medicine & Science in Sports & Exercise Compendium',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'fitness-workout',
    initialDefaults: {
      weightLbs: 165,
      age: 35,
      restingHr: 65,
      activityMet: 7.0,
      durationMinutes: 45
    }
  },
  {
    slug: 'pregnancy-due-date-finder',
    name: 'Pregnancy Due Date Finder',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Calculate your estimated date of delivery (EDD), current gestational age, and pregnancy milestone trimesters based on Naegele’s rule.',
    metaTitle: 'Pregnancy Due Date Calculator — Free Estimated Due Date (EDD) Finder',
    metaDescription: 'Free online pregnancy due date finder. Calculate your estimated delivery date, gestational weeks, and trimester calendar based on your last menstrual period (LMP).',
    primaryKeyword: 'pregnancy due date calculator',
    secondaryKeywords: ['due date finder', 'pregnancy calculator', 'conception date'],
    directAnswer: 'A pregnancy due date finder estimates your baby’s expected delivery date (EDD) and current gestational age based on the first day of your Last Menstrual Period (LMP), conception date, or ultrasound date. Using clinical Naegele’s rule (280 days / 40 weeks from LMP), it generates an organized trimester timeline and developmental milestones.',
    formulaHtml: `
      <p>Standard Naegele’s Rule for Estimated Date of Delivery (EDD):</p>
      <div class="math-formula">
        <code>EDD = First day of LMP + 1 year - 3 months + 7 days</code><br />
        <code>Or: EDD = First day of LMP + 280 days (40 full gestational weeks)</code><br />
        <code>Conception Date Method: EDD = Date of Conception + 266 days (38 weeks)</code>
      </div>
      <p>Trimester Breakdown: First Trimester (Weeks 1–13), Second Trimester (Weeks 14–27), Third Trimester (Weeks 28–40+).</p>
    `,
    workedExample: {
      title: 'Due Date from Last Menstrual Period (LMP on April 10, 2026)',
      inputs: {
        'Calculation Method': 'Last Menstrual Period (LMP)',
        'First Day of LMP': 'April 10, 2026',
        'Average Cycle Length': '28 days'
      },
      calculationHtml: `
        <p>1. Add 7 days to day of LMP: April 10 + 7 days = April 17</p>
        <p>2. Subtract 3 months: April - 3 months = January</p>
        <p>3. Advance 1 year: 2026 + 1 = 2027</p>
        <p>4. Estimated Date of Delivery (EDD) = <strong>January 15, 2027</strong></p>
        <p>5. End of 1st Trimester: July 10, 2026 (13 weeks)</p>
        <p>6. End of 2nd Trimester: October 16, 2026 (27 weeks)</p>
      `,
      result: 'Estimated Due Date: January 15, 2027 (Full 40 Gestational Weeks)'
    },
    steps: [
      'Select your calculation basis: Last Menstrual Period (LMP), Conception Date, or IVF Transfer Date.',
      'Enter the corresponding date and your typical menstrual cycle length (default 28 days).',
      'Instantly view your estimated delivery date and current gestational progress (weeks + days).',
      'Review your comprehensive pregnancy calendar mapping trimesters and key clinical screening windows.'
    ],
    limitations: [
      'Only about 4% to 5% of babies arrive precisely on their calculated due date; full-term birth normally occurs between 37 and 42 weeks.',
      'First-trimester crown-rump length (CRL) ultrasound measurements provide the most clinically authoritative dating if menstrual dates are irregular.'
    ],
    faqs: [
      {
        question: 'How accurate is a pregnancy due date calculator?',
        answer: 'Calculations based on Naegele’s rule provide an estimated benchmark. While only ~4% of births occur on the exact date, approximately 80% of babies are born within two weeks before or after the estimated date (between 38 and 42 weeks of gestation).'
      },
      {
        question: 'Why is gestational age calculated from the last period instead of conception?',
        answer: 'Because most women know the date their period started, but pinpointing the exact day of ovulation and conception is biologically difficult. Consequently, obstetricians measure gestational age from the first day of the last menstrual period, making pregnancy ~40 weeks long even though the fetus is ~38 weeks old.'
      },
      {
        question: 'How does cycle length affect the due date calculation?',
        answer: 'Naegele’s rule assumes a standard 28-day cycle with ovulation on day 14. If your average cycle is 32 days, ovulation likely occurred around day 18, so your due date shifts forward by 4 days.'
      },
      {
        question: 'When does each trimester begin and end?',
        answer: 'The first trimester spans from conception through week 13. The second trimester spans weeks 14 through 27. The third trimester begins at week 28 and continues until delivery.'
      },
      {
        question: 'What is considered a full-term pregnancy?',
        answer: 'The American College of Obstetricians and Gynecologists (ACOG) defines full term as delivery between 39 weeks 0 days and 40 weeks 6 days, when infant organ development is optimal.'
      }
    ],
    relatedSlugs: ['bmi-ideal-weight-calculator', 'calorie-intake-deficit-tracker', 'time-date-calculator', 'sleep-calculator'],
    sources: [
      {
        claim: 'American College of Obstetricians and Gynecologists (ACOG) gestational age estimation guidelines.',
        source: 'ACOG Committee Opinion No. 700: Methods for Estimating Due Date',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'pregnancy',
    initialDefaults: {
      method: 'lmp',
      lmpDate: '2026-04-10',
      cycleLength: 28
    }
  },
  {
    slug: 'steps-to-km-converter',
    name: 'Steps to Km Converter',
    category: 'health',
    badge: 'Popular',
    shortDescription: 'Convert pedometer step counts into distance in kilometers and miles, and estimate calories burned based on stride length.',
    metaTitle: 'Steps to Km Converter — Free Step Count to Distance & Calories Tool',
    metaDescription: 'Free online steps to km converter. Convert walking or running steps into kilometers and miles with custom stride lengths, walking pace, and calories burned.',
    primaryKeyword: 'steps to km converter',
    secondaryKeywords: ['steps to kilometers', 'step distance converter', 'walking distance'],
    directAnswer: 'A steps to km converter converts your pedometer or smartwatch daily step counts into kilometers and miles, while calculating calories burned based on your biological sex, height, and estimated stride length. For an average adult walking stride (approx. 0.74 to 0.79 meters), 10,000 steps equals roughly 7.5 to 8.0 kilometers (4.7 to 5.0 miles).',
    formulaHtml: `
      <p>Step-to-distance conversion formulas:</p>
      <div class="math-formula">
        <code>Estimated Stride Length = Height (cm) × 0.415 (Men) or Height (cm) × 0.413 (Women)</code><br />
        <code>Distance (km) = (Steps × Stride Length in meters) ÷ 1,000</code><br />
        <code>Distance (miles) = Distance (km) × 0.621371</code><br />
        <code>Estimated Calories Burned ≈ Steps × 0.04 kcal (average adult brisk walk)</code>
      </div>
    `,
    workedExample: {
      title: '10,000 Steps for an Adult (Height: 5 ft 10 in / 178 cm, Male, 175 lbs / 79.4 kg)',
      inputs: {
        'Step Count': '10,000 steps',
        'Height': '178 cm (5 ft 10 in)',
        'Biological Sex': 'Male',
        'Body Weight': '79.4 kg (175 lbs)'
      },
      calculationHtml: `
        <p>1. Stride Length = 178 cm × 0.415 = 73.87 cm (0.7387 meters per step)</p>
        <p>2. Total Distance (meters) = 10,000 × 0.7387 m = 7,387 meters</p>
        <p>3. Distance in Kilometers = 7,387 ÷ 1,000 = <strong>7.39 km</strong></p>
        <p>4. Distance in Miles = 7.39 × 0.621371 = <strong>4.59 miles</strong></p>
        <p>5. Calorie Burn (approx. 0.045 kcal/step at brisk pace) = 10,000 × 0.045 = <strong>450 calories</strong></p>
      `,
      result: '10,000 Steps = 7.39 km (4.59 miles) | Calories Burned: ~450 kcal'
    },
    steps: [
      'Enter your total daily step count from your fitness watch, phone, or pedometer.',
      'Enter your height to automatically calculate your natural stride length, or type a custom stride length.',
      'Specify your body weight to compute tailored calorie expenditure.',
      'Instantly view your total distance in kilometers, miles, and meters, alongside estimated active calories.'
    ],
    limitations: [
      'Smartwatches sometimes register arm movements (washing dishes, driving on bumpy roads) as false steps.',
      'Running steps produce a significantly longer stride length (height × 0.84) than casual walking steps.'
    ],
    faqs: [
      {
        question: 'How many kilometers is 10,000 steps?',
        answer: 'For an average adult stride length of 2.4 to 2.6 feet (73 to 79 cm), 10,000 steps translates to approximately 7.4 to 8.0 kilometers, or roughly 4.6 to 5.0 miles.'
      },
      {
        question: 'How is walking stride length calculated from height?',
        answer: 'Biomechanically, an adult’s walking stride length averages approximately 41.5% of their total standing height for men and 41.3% for women. For example, someone 175 cm tall has an estimated walking stride of roughly 72.6 cm (2.38 feet).'
      },
      {
        question: 'How many calories do you burn per 1,000 steps?',
        answer: 'An average adult burns approximately 35 to 50 calories per 1,000 steps, depending on body weight, walking speed, and terrain incline. Heavier individuals burn more calories per step than lighter individuals.'
      },
      {
        question: 'Is 10,000 steps a day necessary for good health?',
        answer: 'While 10,000 steps was originally a Japanese pedometer marketing target from the 1960s, extensive recent medical studies published in JAMA and The Lancet show substantial cardiovascular and mortality benefits begin plateauing between 7,500 and 8,500 steps per day.'
      },
      {
        question: 'How does this tool connect to the Fitness and Workout Calculator?',
        answer: 'For mixed workouts combining walking with running, weightlifting, cycling, or swimming, use our Fitness and Workout Calculator to estimate total session caloric burn using precise MET metrics.'
      }
    ],
    relatedSlugs: ['fitness-workout-calculator', 'calorie-intake-deficit-tracker', 'unit-conversion-calculator', 'calorie-macro-calculator'],
    sources: [
      {
        claim: 'Biomechanical stride length formulas and step-to-distance conversion metrics.',
        source: 'American College of Sports Medicine (ACSM)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'steps-converter',
    initialDefaults: {
      steps: 10000,
      heightCm: 178,
      weightKg: 79.4,
      gender: 'male'
    }
  }
];
