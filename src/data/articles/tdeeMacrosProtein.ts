import type { BlogPost } from '../blogPosts';

export const articleTdeeMacrosProtein: BlogPost = {
  slug: 'tdee-macros-protein-guide',
  title: 'TDEE, Macros, and Protein: How to Calculate What You Should Actually Eat',
  metaTitle: 'TDEE, Macros & Protein Guide: How to Calculate Your Diet | AIO Calculator',
  metaDescription: 'Learn the difference between BMR and TDEE, calculate exact protein intake per kg, determine calorie deficits for fat loss, and model cutting or bulking macro splits.',
  publishDate: '2026-11-18',
  updateDate: '2026-11-18',
  author: 'AIO Calculator Health & Science Editorial Team',
  readingTime: '9 min read',
  summary: 'A scientifically grounded nutritional guide explaining BMR vs TDEE, evidence-backed protein targets per kilogram, caloric deficits for fat loss, and macro distributions for body recomposition.',
  relatedToolSlug: 'tdee-calculator',
  secondaryToolSlugs: ['calorie-macro-calculator', 'calorie-intake-deficit-tracker', 'bmi-body-fat-calculator'],
  keywords: [
    'TDEE for weight loss',
    'BMR vs TDEE difference',
    'protein intake per kg',
    'macro split cutting bulking'
  ],
  faqs: [
    {
      question: 'What is the exact biological difference between BMR and TDEE?',
      answer: 'Basal Metabolic Rate (BMR) is the baseline caloric energy expended strictly to maintain vital organ functions (respiration, cardiac output, cellular regeneration) in a fasted, resting state. Total Daily Energy Expenditure (TDEE) accounts for BMR plus non-exercise activity thermogenesis (NEAT), the thermic effect of food (TEF ~10%), and exercise energy expenditure (EEE).'
    },
    {
      question: 'How do you calculate a safe calorie deficit for sustainable weight loss?',
      answer: 'A sustainable deficit is typically 300 to 500 kcal per day below your maintenance TDEE, which produces an estimated fat loss of approximately 0.35 to 0.5 kg (0.75 to 1.1 lbs) per week while preserving lean skeletal muscle tissue and hormonal health.'
    },
    {
      question: 'How much protein should you consume per kilogram of body weight?',
      answer: 'According to International Society of Sports Nutrition (ISSN) guidelines, sedentary adults require 0.8g protein per kg. For active individuals and resistance trainers seeking hypertrophy or muscle retention in a calorie deficit, the evidence-backed target is 1.6g to 2.2g per kg (0.73g to 1.0g per lb) of body weight.'
    },
    {
      question: 'What are the recommended macronutrient ratios for cutting vs bulking?',
      answer: 'During a fat loss cut, prioritize protein to preserve muscle: 35%–40% protein, 35%–40% carbohydrates, and 20%–25% dietary fats. For a lean muscle-building bulk in a calorie surplus: 25%–30% protein, 45%–55% carbohydrates (to fuel glycolytic training), and 20%–25% healthy fats.'
    },
    {
      question: 'Why does weight loss often stall after 4 to 8 weeks on the same calories?',
      answer: 'As body mass decreases, BMR drops because a lighter body requires fewer calories to move and maintain tissue. Additionally, non-conscious movement (NEAT) naturally downregulates (metabolic adaptation). Recalculating your TDEE every 4 to 5 kg of weight change is essential to maintain progress.'
    }
  ],
  contentHtml: `
    <p class="direct-answer-lead">
      <strong>Direct Answer:</strong> To determine what you should actually eat, calculate your Total Daily Energy Expenditure (TDEE) by multiplying your Basal Metabolic Rate (BMR via the Mifflin-St Jeor formula) by your physical activity multiplier (1.2 to 1.9). For fat loss, eat a 300 to 500 kcal deficit below TDEE; for muscle gain, eat a 250 to 400 kcal surplus. In both cases, anchor your nutrition by consuming 1.6 to 2.2 grams of protein per kilogram of body weight, filling remaining calories with carbohydrates and essential fats.
    </p>

    <h2>The Biological Difference: BMR vs. TDEE</h2>
    <p>
      Many fitness enthusiasts mistake their <strong>Basal Metabolic Rate (BMR)</strong> for the calories they burn in a day. Understanding this distinction is the cornerstone of metabolic energy balance:
    </p>
    <ul>
      <li>
        <strong>Basal Metabolic Rate (BMR):</strong> The baseline metabolic energy required to sustain life (brain function, hepatic metabolism, pulmonary respiration, cell turnover) if you were in a coma in bed all day. BMR typically represents <strong>60% to 70%</strong> of total daily energy expenditure.
      </li>
      <li>
        <strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Energy burned through spontaneous daily movement (walking, typing, fidgeting, carrying groceries), comprising <strong>15% to 20%</strong> of daily expenditure.
      </li>
      <li>
        <strong>Thermic Effect of Food (TEF):</strong> Metabolic energy consumed digesting, absorbing, and assimilating nutrients (protein requires ~20%&ndash;30% of its caloric value to digest, carbohydrates ~5%&ndash;10%, fats ~0%&ndash;3%), accounting for roughly <strong>8% to 10%</strong> of total burn.
      </li>
      <li>
        <strong>Exercise Energy Expenditure (EEE):</strong> Calories burned during deliberate athletic training or cardio sessions, typically representing just <strong>5% to 10%</strong> of daily burn for recreational athletes.
      </li>
    </ul>

    <h2>The Standard Formula: Mifflin-St Jeor & Physical Activity Levels</h2>
    <p>
      Clinical nutritionists use the <strong>Mifflin-St Jeor equation</strong>, recognized as the most accurate predictive formula for BMR in non-obese and obese populations:
    </p>
    <div class="formula-box">
      <strong>Men: BMR = (10 &times; weight in kg) + (6.25 &times; height in cm) - (5 &times; age in years) + 5</strong><br>
      <strong>Women: BMR = (10 &times; weight in kg) + (6.25 &times; height in cm) - (5 &times; age in years) - 161</strong>
    </div>
    <p>
      To compute <strong>TDEE</strong>, multiply your BMR by your verified physical activity level (PAL):
    </p>
    <ul>
      <li><strong>Sedentary (desk job, minimal exercise):</strong> BMR &times; 1.20</li>
      <li><strong>Light Activity (light exercise 1&ndash;3 days/week):</strong> BMR &times; 1.375</li>
      <li><strong>Moderate Activity (moderate workouts 3&ndash;5 days/week):</strong> BMR &times; 1.55</li>
      <li><strong>Very Active (heavy resistance or endurance 6&ndash;7 days/week):</strong> BMR &times; 1.725</li>
      <li><strong>Extremely Active (hard labor job + intense athletic training):</strong> BMR &times; 1.90</li>
    </ul>

    <h2>Evidence-Based Protein Guidelines: How Much Do You Need?</h2>
    <p>
      Protein is the single most vital macronutrient for body recomposition because it supplies essential amino acids (specifically leucine) required to trigger Muscle Protein Synthesis (MPS) via the mTOR pathway while exerting the highest thermic effect and satiety signaling.
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Activity Profile</th>
            <th>Protein Target (g/kg Bodyweight)</th>
            <th>Protein Target (g/lb Bodyweight)</th>
            <th>Primary Objective</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sedentary Adult (RDA Baseline)</strong></td>
            <td>0.8 g / kg</td>
            <td>0.36 g / lb</td>
            <td>Prevent deficiency; no muscle growth</td>
          </tr>
          <tr>
            <td><strong>Endurance Runner / Cyclist</strong></td>
            <td>1.2 &ndash; 1.4 g / kg</td>
            <td>0.55 &ndash; 0.64 g / lb</td>
            <td>Glycogen replenishment, tissue repair</td>
          </tr>
          <tr>
            <td><strong>Resistance Training (Muscle Bulk)</strong></td>
            <td>1.6 &ndash; 2.0 g / kg</td>
            <td>0.73 &ndash; 0.91 g / lb</td>
            <td>Maximum skeletal muscle hypertrophy</td>
          </tr>
          <tr>
            <td><strong>Resistance Training in Deficit (Cutting)</strong></td>
            <td>2.0 &ndash; 2.4 g / kg</td>
            <td>0.91 &ndash; 1.09 g / lb</td>
            <td>Prevent muscle catabolism during energy deficit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Macro Distribution Splits: Cutting vs. Bulking</h2>
    <p>
      Once total calories and daily protein grams are established, your remaining caloric budget is distributed between carbohydrates (4 kcal/gram) and dietary fats (9 kcal/gram):
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Caloric Target Relative to TDEE</th>
            <th>Protein Split</th>
            <th>Carb Split</th>
            <th>Fat Split</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aggressive Cut (Rapid Fat Loss)</strong></td>
            <td>-500 to -600 kcal</td>
            <td>40%</td>
            <td>35%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td><strong>Moderate Cut (Recomposition)</strong></td>
            <td>-300 to -400 kcal</td>
            <td>35%</td>
            <td>40%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td><strong>Maintenance / Health</strong></td>
            <td>0 kcal (TDEE baseline)</td>
            <td>30%</td>
            <td>45%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td><strong>Lean Bulk (Hypertrophy)</strong></td>
            <td>+250 to +350 kcal</td>
            <td>25%</td>
            <td>55%</td>
            <td>20%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Worked Example: 75 kg Male on a Recomposition Cut</h2>
    <p>
      Let us test an end-to-end calculation you can verify in our <a href="/tdee-calculator/">TDEE Calculator</a> and <a href="/calorie-macro-calculator/">Calorie & Macro Calculator</a>:
    </p>
    <ul>
      <li><strong>Individual:</strong> 30-year-old male, 75 kg (165.3 lbs), 178 cm height, moderate training (4 days resistance/week).</li>
      <li><strong>BMR Calculation:</strong> (10 &times; 75) + (6.25 &times; 178) - (5 &times; 30) + 5 = 750 + 1112.5 - 150 + 5 = <strong>1,717.5 kcal</strong>.</li>
      <li><strong>Maintenance TDEE:</strong> 1,717.5 &times; 1.55 = <strong>2,662 kcal/day</strong>.</li>
      <li><strong>Caloric Deficit for Fat Loss:</strong> 2,662 - 450 = <strong>2,212 kcal/day</strong>.</li>
    </ul>
    <p>
      <strong>Macronutrient Allotment:</strong>
    </p>
    <ol>
      <li><strong>Protein (2.0g/kg):</strong> 75 kg &times; 2.0 = <strong>150g protein</strong> = 600 kcal (27.1% of diet).</li>
      <li><strong>Dietary Fats (25% of calories):</strong> 2,212 &times; 0.25 = 553 kcal &divide; 9 = <strong>61g healthy fats</strong>.</li>
      <li><strong>Carbohydrates (Remaining calories):</strong> 2,212 - (600 + 553) = 1,059 kcal &divide; 4 = <strong>265g carbohydrates</strong>.</li>
    </ol>
    <p>
      <a href="/tdee-calculator/" class="btn btn-primary btn-sm">Calculate Your Exact TDEE &rarr;</a>
      <a href="/calorie-macro-calculator/" class="btn btn-outline btn-sm">Calculate Your Macros &rarr;</a>
    </p>

    <h2>Common Mistakes When Tracking Nutrition</h2>
    <ol>
      <li><strong>Overestimating Physical Activity:</strong> Many desk workers who exercise for 45 minutes four times a week categorize themselves as "Very Active." In reality, an hour in the gym does not offset 10 sedentary hours at a computer. Start with "Light" or "Moderate" to prevent overeating.</li>
      <li><strong>Ignoring Liquid Calories and Cooking Oils:</strong> A single tablespoon of olive oil poured into a pan adds 120 kcal. Failing to measure condiments and beverages can inadvertently wipe out a 400-calorie deficit.</li>
      <li><strong>Dropping Calories Too Low (Under 1,200 kcal for women or 1,500 kcal for men):</strong> Extreme starvation diets crash thyroid output (T3), plummet leptin, elevate cortisol, and cause severe lean muscle wasting.</li>
    </ol>

    <h2>Tools to Support Your Health Goals</h2>
    <ul>
      <li>Determine your baseline energy expenditure with the <a href="/tdee-calculator/">TDEE Calculator</a>.</li>
      <li>Plan gram targets with the <a href="/calorie-macro-calculator/">Calorie & Macro Calculator</a>.</li>
      <li>Track body composition changes using the <a href="/bmi-body-fat-calculator/">BMI & Body Fat Calculator</a>.</li>
    </ul>

    <div class="disclaimer-callout" style="margin-top: 2rem; padding: 1rem; background: var(--color-slate-100); border-left: 3px solid var(--color-slate-400); font-size: 0.85rem; color: var(--color-slate-600);">
      <strong>Medical Disclaimer:</strong> Nutritional and caloric figures provided in this article and by our calculators represent estimates derived from validated population formulas. They do not constitute individualized clinical, dietary, or medical prescriptions. Consult a registered dietitian or physician before embarking on aggressive caloric restriction, particularly if you have underlying medical conditions or metabolic disorders.
    </div>
  `
};
