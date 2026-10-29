import type { CalculatorDefinition } from './types';

export const mathCalculators: CalculatorDefinition[] = [
  {
    slug: 'basic-math-calculator',
    name: 'Basic Math Calculator',
    category: 'math',
    badge: 'Popular',
    shortDescription: 'Free clean online arithmetic calculator with standard operations, percentage, memory recall (M+, M-, MR), and keyboard support.',
    metaTitle: 'Basic Math Calculator — Free Online Arithmetic & Simple Calculator',
    metaDescription: 'Free online basic math calculator. Fast, clean arithmetic tool for addition, subtraction, multiplication, division, percentages, and memory with instant keyboard input.',
    primaryKeyword: 'basic calculator',
    secondaryKeywords: ['basic math calculator', 'online calculator', 'simple calculator'],
    directAnswer: 'A basic math calculator performs foundational arithmetic calculations—addition, subtraction, multiplication, and division—alongside percentages, reciprocals, and square roots. Operating with zero latency directly in your browser, it features a responsive keypad, clear display, and full physical keyboard number-pad support.',
    formulaHtml: `
      <p>Order of Operations (PEMDAS / BODMAS):</p>
      <div class="math-formula">
        <code>Parentheses / Brackets → Exponents / Orders → Multiplication & Division (Left to Right) → Addition & Subtraction (Left to Right)</code>
      </div>
    `,
    workedExample: {
      title: 'Order of Operations Arithmetic: 48 ÷ 2 × (9 + 3)',
      inputs: {
        'Expression': '48 ÷ 2 × (9 + 3)'
      },
      calculationHtml: `
        <p>1. Solve inside parentheses: (9 + 3) = 12</p>
        <p>2. Expression becomes: 48 ÷ 2 × 12</p>
        <p>3. Multiplication and division carry equal precedence; evaluate strictly left to right:</p>
        <p>   - 48 ÷ 2 = 24</p>
        <p>   - 24 × 12 = 288</p>
      `,
      result: 'Result: 288 (Standard PEMDAS / Left-to-Right Precedence)'
    },
    steps: [
      'Type numbers and operators using your mouse, touch screen, or physical keyboard number pad.',
      'Press "+" for addition, "−" for subtraction, "×" for multiplication, and "÷" for division.',
      'Use the "%" key for quick percentage computations or "√" for square roots.',
      'Press "=" or the Enter key on your keyboard to evaluate the result.',
      'Use "C" to clear the entire expression or "CE" to clear only the most recent entry.'
    ],
    limitations: [
      'Designed for everyday arithmetic; for trigonometry, logarithms, or complex numbers, use our dedicated Scientific Calculator.',
      'Floating-point binary representations in computer hardware are rounded to 12 decimal places to avoid standard IEEE 754 precision artifacts (e.g. 0.1 + 0.2 = 0.3).'
    ],
    faqs: [
      {
        question: 'Can I use keyboard shortcuts with this basic calculator?',
        answer: 'Yes. The calculator fully supports standard keyboard keys: numbers 0-9, decimal point (.), +, -, *, /, Enter or = to calculate, Backspace to delete the last digit, and Escape to clear.'
      },
      {
        question: 'What do the M+, M-, MR, and MC memory buttons do?',
        answer: 'M+ adds the current display value to stored memory; M- subtracts it; MR (Memory Recall) brings the stored memory number back onto the active screen; MC (Memory Clear) resets stored memory back to zero.'
      },
      {
        question: 'Why does 48 ÷ 2 × (9 + 3) equal 288 instead of 2?',
        answer: 'Under standard mathematical order of operations (PEMDAS), multiplication and division have equal priority and are evaluated strictly from left to right. After evaluating (9+3)=12, 48 is divided by 2 to yield 24, which is then multiplied by 12 to equal 288.'
      },
      {
        question: 'How is this different from the Scientific Calculator?',
        answer: 'This Basic Math Calculator is streamlined for quick daily arithmetic, retail sums, and receipts without clutter. For trigonometric sine/cosine/tangent, powers, roots, and logarithms, visit our Scientific Calculator.'
      },
      {
        question: 'Does this calculator save my personal numbers?',
        answer: 'No. All calculations run strictly in your client browser memory. Nothing is ever sent to a server or stored.'
      }
    ],
    relatedSlugs: ['scientific-calculator', 'percentage-calculator', 'fraction-calculator', 'algebra-equations-calculator'],
    sources: [
      {
        claim: 'Standard mathematical order of operations (PEMDAS/BODMAS) conventions.',
        source: 'National Council of Teachers of Mathematics (NCTM)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'basic-math',
    initialDefaults: {
      expression: '48 / 2 * (9 + 3)'
    }
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    badge: 'Phase 2',
    shortDescription: 'Advanced scientific calculator with trigonometry (sin, cos, tan), logarithms, exponential powers, factorials, and constants (π, e).',
    metaTitle: 'Scientific Calculator — Free Online Advanced Math & Trig Tool',
    metaDescription: 'Free online scientific calculator. Compute trigonometric functions (sin, cos, tan), inverse trig, logarithms (log, ln), powers, roots, and factorials in Degrees or Radians.',
    primaryKeyword: 'scientific calculator',
    secondaryKeywords: ['scientific calculator online', 'trigonometry calculator', 'logarithm calculator'],
    directAnswer: 'A scientific calculator performs advanced mathematical operations beyond basic arithmetic, including trigonometric functions (sine, cosine, tangent), inverse trigonometry, natural and common logarithms (ln, log), powers, roots, factorials, and universal mathematical constants (π, e). It operates in both Degree and Radian modes for STEM students and engineering professionals.',
    formulaHtml: `
      <p>Scientific function foundations:</p>
      <div class="math-formula">
        <code>Trigonometry: sin(θ), cos(θ), tan(θ) (Degree or Radian mode)</code><br />
        <code>Logarithms: log10(x) (base 10), ln(x) (natural log base e ≈ 2.71828)</code><br />
        <code>Powers & Factorials: x^y, √x, x!, 1/x</code>
      </div>
    `,
    workedExample: {
      title: 'Evaluating Scientific Expression: sin(30°) + ln(e²) × 5',
      inputs: {
        'Mode': 'Degrees',
        'Expression': 'sin(30°) + ln(e²) × 5'
      },
      calculationHtml: `
        <p>1. In Degree mode: sin(30°) = 0.5</p>
        <p>2. Natural logarithm of e²: ln(e²) = 2</p>
        <p>3. Multiplication: 2 × 5 = 10</p>
        <p>4. Addition: 0.5 + 10 = 10.5</p>
      `,
      result: 'Result: 10.5'
    },
    steps: [
      'Select your angle mode: DEG (Degrees) or RAD (Radians).',
      'Use standard numbers, scientific notation, and mathematical constants (π and e).',
      'Click advanced functions: sin, cos, tan, ln, log, x^y, √, or ! (factorial).',
      'Press "=" to compute with full operator precedence.',
      'Copy the calculated answer with one click for lab reports and homework.'
    ],
    limitations: [
      'Trigonometric functions at asymptotic discontinuities (such as tan(90°)) return "Undefined" / Infinity as mathematically required.',
      'Factorials (n!) are computed for non-negative integers up to 170! before exceeding 64-bit IEEE floating-point limits.'
    ],
    faqs: [
      {
        question: 'When should I use Degree mode vs Radian mode?',
        answer: 'Use Degree mode for everyday geometry, surveying, and physics problems where angles are stated in degrees (e.g. 0° to 360°). Use Radian mode for calculus, advanced physics, and harmonic motion where angles relate to circle arc length.'
      },
      {
        question: 'What is the difference between log and ln?',
        answer: 'The "log" button calculates the common logarithm with base 10 (log10(100) = 2). The "ln" button calculates the natural logarithm with base e (where e ≈ 2.71828), which is fundamental in exponential growth, decay, and continuous compounding.'
      },
      {
        question: 'How do I compute inverse trigonometric functions (arcsin, arccos, arctan)?',
        answer: 'Click the "2nd" or "Inv" button on the keypad to toggle inverse trigonometric functions (sin⁻¹, cos⁻¹, tan⁻¹) to find the angle whose trigonometric ratio equals your input.'
      },
      {
        question: 'Can this scientific calculator handle parenthesis nesting?',
        answer: 'Yes. You can nest parentheses to arbitrary depths to enforce specific evaluation groupings.'
      },
      {
        question: 'How does this tool connect to the Algebra and Equations Calculator?',
        answer: 'This tool computes single scientific values and expressions. If you need to solve an algebraic equation with unknown variables (such as ax² + bx + c = 0), visit our Algebra and Equations Calculator.'
      }
    ],
    relatedSlugs: ['algebra-equations-calculator', 'geometry-calculator', 'basic-math-calculator', 'fraction-calculator'],
    sources: [
      {
        claim: 'Standard IEEE 754 floating point scientific computation and trigonometric identity standards.',
        source: 'NIST Digital Library of Mathematical Functions (DLMF)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'scientific',
    initialDefaults: {
      mode: 'deg',
      expression: 'sin(30) + ln(e^2) * 5'
    }
  },
  {
    slug: 'algebra-equations-calculator',
    name: 'Algebra and Equations Calculator',
    category: 'math',
    badge: 'Popular',
    shortDescription: 'Solve linear and quadratic equations step by step with discriminant analysis and exact roots.',
    metaTitle: 'Algebra and Equations Calculator — Free Linear & Quadratic Solver',
    metaDescription: 'Free online algebra equations calculator. Solve linear equations (ax + b = c) and quadratic equations (ax² + bx + c = 0) with step-by-step discriminant and root solutions.',
    primaryKeyword: 'algebra calculator',
    secondaryKeywords: ['equation solver', 'algebra equations calculator', 'solve for x'],
    directAnswer: 'An algebra and equations calculator solves linear equations (ax + b = 0) and quadratic polynomial equations (ax² + bx + c = 0), providing step-by-step algebraic working, discriminant evaluations, and both exact and decimal roots. It enables students and engineers to verify variable solutions for x instantly.',
    formulaHtml: `
      <p>Linear Equation Solution:</p>
      <div class="math-formula">
        <code>ax + b = 0 ⟹ x = -b ÷ a (for a ≠ 0)</code>
      </div>
      <p>Quadratic Formula and Discriminant (Δ):</p>
      <div class="math-formula">
        <code>Discriminant: Δ = b² - 4ac</code><br />
        <code>Roots: x = (-b ± √(b² - 4ac)) ÷ (2a)</code>
      </div>
      <p>Discriminant Properties: If Δ &gt; 0, two distinct real roots exist. If Δ = 0, one repeated real root exists. If Δ &lt; 0, two complex conjugate roots exist.</p>
    `,
    workedExample: {
      title: 'Quadratic Equation Solution: 2x² - 4x - 6 = 0',
      inputs: {
        'Coefficient a': '2',
        'Coefficient b': '-4',
        'Coefficient c': '-6'
      },
      calculationHtml: `
        <p>1. Identify coefficients: a = 2, b = -4, c = -6</p>
        <p>2. Calculate Discriminant: Δ = (-4)² - 4(2)(-6) = 16 - (-48) = 64</p>
        <p>3. Because Δ = 64 &gt; 0, two distinct real roots exist.</p>
        <p>4. √64 = 8</p>
        <p>5. Root 1: x₁ = [-(-4) + 8] ÷ [2(2)] = (4 + 8) ÷ 4 = 12 ÷ 4 = <strong>3</strong></p>
        <p>6. Root 2: x₂ = [-(-4) - 8] ÷ [2(2)] = (4 - 8) ÷ 4 = -4 ÷ 4 = <strong>-1</strong></p>
      `,
      result: 'Roots: x = 3 and x = -1 (Discriminant Δ = 64)'
    },
    steps: [
      'Select the equation type: Linear (ax + b = c) or Quadratic (ax² + bx + c = 0).',
      'Input the numerical coefficients (a, b, and c).',
      'Click Solve to view the step-by-step mathematical derivation.',
      'Inspect the discriminant value, vertex coordinates (-b/2a), and real roots.'
    ],
    limitations: [
      'The leading coefficient "a" cannot be 0 in a quadratic equation (as that reduces the expression to a linear equation).',
      'Non-polynomial transcendental equations (e.g. e^x = sin(x)) require numerical iterative methods not covered by closed-form algebra.'
    ],
    faqs: [
      {
        question: 'What is the discriminant in a quadratic equation?',
        answer: 'The discriminant is the expression under the square root in the quadratic formula: Δ = b² - 4ac. It reveals the nature of the roots without having to calculate them: positive means two real roots, zero means one repeated root, and negative means two complex roots.'
      },
      {
        question: 'What does it mean if a quadratic equation has complex roots?',
        answer: 'When the discriminant is negative (b² - 4ac < 0), the square root of a negative number produces an imaginary number (i = √-1). The roots take the form p ± qi, meaning the parabola does not cross the x-axis.'
      },
      {
        question: 'How do you find the vertex of a parabola from the equation?',
        answer: 'The x-coordinate of the vertex of the parabola y = ax² + bx + c is located at x = -b ÷ (2a). Substituting that x back into the equation yields the minimum (if a > 0) or maximum (if a < 0) y-value.'
      },
      {
        question: 'Can this calculator solve systems of equations?',
        answer: 'This tool currently focuses on single-variable linear and quadratic equations. For fraction simplification, see our Fraction Calculator.'
      },
      {
        question: 'How does this tool connect to the Geometry Calculator?',
        answer: 'Many geometric problems (such as finding the dimensions of a rectangle given area and perimeter, or computing circle-line intersections) resolve directly into quadratic equations solved here.'
      }
    ],
    relatedSlugs: ['scientific-calculator', 'geometry-calculator', 'fraction-calculator', 'basic-math-calculator'],
    sources: [
      {
        claim: 'Algebraic polynomial factorization and quadratic theorem proofs.',
        source: 'Mathematical Association of America (MAA)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'algebra',
    initialDefaults: {
      type: 'quadratic',
      a: 2,
      b: -4,
      c: -6
    }
  },
  {
    slug: 'geometry-calculator',
    name: 'Geometry Calculator',
    category: 'math',
    badge: 'Popular',
    shortDescription: 'Calculate area, perimeter, surface area, and volume for 2D and 3D geometric shapes with instant formulas.',
    metaTitle: 'Geometry Calculator — Free Area, Perimeter & Volume Solver',
    metaDescription: 'Free online geometry calculator. Calculate area, perimeter, circumference, surface area, and volume for circles, rectangles, triangles, cylinders, spheres, and cones.',
    primaryKeyword: 'geometry calculator',
    secondaryKeywords: ['area calculator', 'volume calculator', 'geometry formulas'],
    directAnswer: 'A geometry calculator computes the geometric properties of 2D shapes (area, perimeter, circumference) and 3D solids (surface area, volume). By selecting a shape—such as a circle, rectangle, triangle, sphere, cylinder, or cone—and providing known dimensions, it calculates all corresponding measurements instantly.',
    formulaHtml: `
      <p>Key 2D and 3D Geometric Formulas:</p>
      <ul>
        <li><strong>Circle:</strong> Area = πr², Circumference = 2πr</li>
        <li><strong>Rectangle:</strong> Area = l × w, Perimeter = 2(l + w)</li>
        <li><strong>Triangle:</strong> Area = ½ × base × height</li>
        <li><strong>Cylinder:</strong> Volume = πr²h, Total Surface Area = 2πr(r + h)</li>
        <li><strong>Sphere:</strong> Volume = (4/3)πr³, Surface Area = 4πr²</li>
        <li><strong>Cone:</strong> Volume = (1/3)πr²h, Slant Height s = √(r² + h²)</li>
      </ul>
    `,
    workedExample: {
      title: 'Cylinder Dimensions: Radius = 4 cm, Height = 10 cm',
      inputs: {
        'Shape': 'Cylinder',
        'Radius (r)': '4 cm',
        'Height (h)': '10 cm'
      },
      calculationHtml: `
        <p>1. Base Area = π × (4 cm)² = 16π ≈ 50.27 cm²</p>
        <p>2. Volume = Base Area × Height = 50.27 × 10 = <strong>502.65 cm³</strong></p>
        <p>3. Lateral Surface Area = 2 × π × 4 × 10 = 80π ≈ 251.33 cm²</p>
        <p>4. Total Surface Area = 2πr² + 2πrh = 2(50.27) + 251.33 = <strong>351.86 cm²</strong></p>
      `,
      result: 'Volume: 502.65 cm³ | Total Surface Area: 351.86 cm²'
    },
    steps: [
      'Select 2D (Circle, Rectangle, Triangle, Trapezoid) or 3D (Cylinder, Sphere, Cone, Rectangular Prism).',
      'Enter the known dimensions (radius, length, width, or height).',
      'Choose your preferred measurement units (inches, feet, cm, meters).',
      'Review exact formulas, intermediate steps, and final calculated area or volume.'
    ],
    limitations: [
      'Dimensions must be entered in consistent units; mixing inches and centimeters requires converting first with our Unit Converter.',
      'Irregular polygons with curved boundaries require calculus integration rather than elementary geometry formulas.'
    ],
    faqs: [
      {
        question: 'What is the difference between surface area and volume?',
        answer: 'Surface area measures the total 2-dimensional area covering the outside of a 3-dimensional solid (measured in square units like cm²). Volume measures the internal 3-dimensional space or capacity enclosed within the object (measured in cubic units like cm³).'
      },
      {
        question: 'What is the Pythagorean theorem?',
        answer: 'The Pythagorean theorem states that in any right-angled triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides: a² + b² = c².'
      },
      {
        question: 'How do you calculate the volume of a sphere?',
        answer: 'The volume of a sphere is given by V = (4/3) × π × r³, where r is the radius of the sphere. For example, a sphere with a 3-inch radius has a volume of (4/3) × π × 27 ≈ 113.1 cubic inches.'
      },
      {
        question: 'How do you convert cubic centimeters to liters?',
        answer: 'One liter equals exactly 1,000 cubic centimeters (cm³ or mL). For example, a cylinder with 2,500 cm³ volume holds exactly 2.5 liters of liquid.'
      },
      {
        question: 'How does this tool connect to the Unit Conversion Calculator?',
        answer: 'If you need to convert your geometric answers into gallons, square feet, acres, or cubic yards, use our Unit and Conversion Calculator.'
      }
    ],
    relatedSlugs: ['unit-conversion-calculator', 'scientific-calculator', 'algebra-equations-calculator', 'basic-math-calculator'],
    sources: [
      {
        claim: 'Euclidean geometry definitions and standard mensuration formulas.',
        source: 'CRC Standard Mathematical Tables and Formulae',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'geometry',
    initialDefaults: {
      shape: 'cylinder',
      radius: 4,
      height: 10
    }
  },
  {
    slug: 'average-statistics-calculator',
    name: 'Average and Statistics Calculator',
    category: 'math',
    badge: 'Popular',
    shortDescription: 'Calculate mean, median, mode, sample and population standard deviation, variance, and range for any dataset.',
    metaTitle: 'Average and Statistics Calculator — Free Mean, Median & Standard Deviation Tool',
    metaDescription: 'Free online average and statistics calculator. Calculate mean, median, mode, range, standard deviation, and variance for sample and population data with full working.',
    primaryKeyword: 'average calculator',
    secondaryKeywords: ['statistics calculator', 'mean median mode calculator', 'standard deviation'],
    directAnswer: 'An average and statistics calculator computes key measures of central tendency (mean, median, mode) and dispersion (sample and population standard deviation, variance, range) from a set of numbers. It provides full descriptive statistical analysis for researchers, students, and analysts.',
    formulaHtml: `
      <p>Descriptive statistics formulas for dataset {x₁, x₂, ..., x_n}:</p>
      <div class="math-formula">
        <code>Mean (x̄) = (Σ x_i) ÷ n</code><br />
        <code>Median = Middle value of sorted data (or average of two middle values if n is even)</code><br />
        <code>Sample Variance (s²) = [Σ (x_i - x̄)²] ÷ (n - 1)</code><br />
        <code>Sample Standard Deviation (s) = √s²</code><br />
        <code>Population Standard Deviation (σ) = √[Σ (x_i - μ)² ÷ N]</code>
      </div>
    `,
    workedExample: {
      title: 'Statistics for Dataset: 12, 15, 18, 18, 22, 25, 30 (n = 7)',
      inputs: {
        'Dataset': '12, 15, 18, 18, 22, 25, 30'
      },
      calculationHtml: `
        <p>1. Count (n) = 7</p>
        <p>2. Sum = 12 + 15 + 18 + 18 + 22 + 25 + 30 = 140</p>
        <p>3. Mean = 140 ÷ 7 = <strong>20.0</strong></p>
        <p>4. Median (4th sorted value) = <strong>18.0</strong></p>
        <p>5. Mode (most frequent) = <strong>18.0</strong> (appears twice)</p>
        <p>6. Range = Max - Min = 30 - 12 = <strong>18.0</strong></p>
        <p>7. Sum of squared differences = (12-20)² + (15-20)² + 2(18-20)² + (22-20)² + (25-20)² + (30-20)² = 64 + 25 + 8 + 4 + 25 + 100 = 226</p>
        <p>8. Sample Variance (s²) = 226 ÷ (7 - 1) = 37.67</p>
        <p>9. Sample Standard Deviation (s) = √37.67 = <strong>6.14</strong></p>
      `,
      result: 'Mean: 20.0 | Median: 18.0 | Mode: 18.0 | Sample Std Dev: 6.14'
    },
    steps: [
      'Paste or type numbers separated by commas, spaces, or line breaks.',
      'Select whether your data represents a Sample (n-1 degrees of freedom) or an entire Population (N).',
      'Instantly view the statistical summary card with mean, median, mode, and standard deviation.',
      'Review the step-by-step deviations and variance table.'
    ],
    limitations: [
      'Extreme outliers can distort the mean; always examine the median for skewed datasets (such as real estate prices or household income).',
      'Datasets with no repeated numbers have no mode, while datasets with multiple peaks are multimodal.'
    ],
    faqs: [
      {
        question: 'What is the difference between sample and population standard deviation?',
        answer: 'Use sample standard deviation (dividing by n - 1, known as Bessel\'s correction) when your data is a subset or sample of a larger group. Use population standard deviation (dividing by N) only when your dataset contains every single member of the entire group being studied.'
      },
      {
        question: 'When should I use median instead of mean?',
        answer: 'Use the median when your data is skewed or contains extreme outliers (such as salaries, housing costs, or net worth), because the median reflects the true middle value and is not skewed by single massive numbers.'
      },
      {
        question: 'What does standard deviation measure?',
        answer: 'Standard deviation measures the average dispersion or spread of data points around their mean. A small standard deviation indicates numbers are tightly clustered near the average; a large standard deviation indicates wide variability.'
      },
      {
        question: 'Can a dataset have more than one mode?',
        answer: 'Yes. A dataset with two values tying for the highest frequency is bimodal; with three, it is trimodal; with more, it is multimodal. If all numbers occur with equal frequency, the dataset has no mode.'
      },
      {
        question: 'How does this tool connect to Probability and Data?',
        answer: 'Descriptive statistics form the backbone of probability distributions. Visit our Probability and Data Calculator to model normal distributions, combinations, and permutations.'
      }
    ],
    relatedSlugs: ['probability-data-calculator', 'gpa-calculator', 'basic-math-calculator', 'scientific-calculator'],
    sources: [
      {
        claim: 'Descriptive statistics formulas and Bessel\'s correction proof.',
        source: 'American Statistical Association (ASA)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'statistics',
    initialDefaults: {
      dataString: '12, 15, 18, 18, 22, 25, 30',
      isSample: true
    }
  },
  {
    slug: 'probability-data-calculator',
    name: 'Probability and Data Calculator',
    category: 'math',
    badge: 'Popular',
    shortDescription: 'Calculate single-event probability, independent compound probabilities, combinations (nCr), and permutations (nPr).',
    metaTitle: 'Probability and Data Calculator — Free Combinations, Permutations & Odds Tool',
    metaDescription: 'Free online probability calculator. Calculate event odds, independent and dependent probabilities, permutations (nPr), and combinations (nCr) with step-by-step solutions.',
    primaryKeyword: 'probability calculator',
    secondaryKeywords: ['probability and data calculator', 'probability formula', 'data probability'],
    directAnswer: 'A probability and data calculator computes the likelihood of random events occurring, alongside fundamental combinatorics metrics: combinations (nCr) where order does not matter, and permutations (nPr) where order matters. It evaluates single events, complementary odds, and compound probabilities (AND / OR logic) for mathematics and statistics.',
    formulaHtml: `
      <p>Foundational Probability & Combinatorics Formulas:</p>
      <div class="math-formula">
        <code>Single Event Probability: P(A) = Favorable Outcomes ÷ Total Possible Outcomes</code><br />
        <code>Combinations (Order does NOT matter): nCr = n! ÷ [r!(n - r)!]</code><br />
        <code>Permutations (Order DOES matter): nPr = n! ÷ (n - r)!</code><br />
        <code>Independent Events (AND): P(A and B) = P(A) × P(B)</code><br />
        <code>Mutually Exclusive Events (OR): P(A or B) = P(A) + P(B)</code>
      </div>
    `,
    workedExample: {
      title: 'Combinations Example: Choosing a 5-Person Committee from 12 Candidates (n = 12, r = 5)',
      inputs: {
        'Total Candidates (n)': '12',
        'Selections (r)': '5',
        'Type': 'Combinations (nCr — order does not matter)'
      },
      calculationHtml: `
        <p>1. Formula: 12C5 = 12! ÷ [5!(12 - 5)!] = 12! ÷ (5! × 7!)</p>
        <p>2. Expand: (12 × 11 × 10 × 9 × 8 × 7!) ÷ (120 × 7!)</p>
        <p>3. Simplify: (12 × 11 × 10 × 9 × 8) ÷ 120 = 95,040 ÷ 120 = <strong>792</strong></p>
        <p>4. There are exactly 792 unique possible committee combinations.</p>
      `,
      result: 'Combinations (12C5): 792 unique groups'
    },
    steps: [
      'Select the tool mode: Single Event Probability, Compound Events, or Combinatorics (nCr / nPr).',
      'For probability: enter favorable outcomes and total possible outcomes.',
      'For combinatorics: enter total items (n) and sample size to choose (r).',
      'View the computed decimal probability, percentage chance, odds ratio, and exact combinatorial permutations.'
    ],
    limitations: [
      'Combinations (nCr) and permutations (nPr) require non-negative integers; large values of n (> 100) are evaluated using gamma function approximations to prevent numeric overflow.',
      'Assumes all fundamental outcomes in the sample space are equally likely.'
    ],
    faqs: [
      {
        question: 'What is the difference between a permutation and a combination?',
        answer: 'In a combination, order does not matter (e.g. selecting 3 friends for a movie). In a permutation, order matters (e.g. 1st, 2nd, and 3rd place in a race, or digits in a locker combination lock).'
      },
      {
        question: 'How do you convert probability to odds?',
        answer: 'If the probability of an event is P, the odds in favor are P ÷ (1 - P). For example, a 20% probability (0.20) corresponds to odds of 0.20 ÷ 0.80 = 1 to 4.'
      },
      {
        question: 'What is the law of large numbers?',
        answer: 'The law of large numbers states that as an experiment is repeated over a large number of independent trials (such as flipping a fair coin thousands of times), the observed relative frequency will converge toward the theoretical expected probability (50%).'
      },
      {
        question: 'How do independent and dependent events differ in probability?',
        answer: 'Independent events do not influence each other (e.g. rolling two separate dice). Dependent events affect subsequent outcomes (e.g. drawing two cards from a deck without replacement, where the first draw alters remaining deck odds).'
      },
      {
        question: 'How does this tool connect to the Free Online Dice Roller?',
        answer: 'Our Free Online Dice Roller generates actual cryptographically random dice rolls that you can use to test theoretical multi-dice probability outcomes calculated here.'
      }
    ],
    relatedSlugs: ['average-statistics-calculator', 'free-online-dice-roller-1-to-100', 'basic-math-calculator', 'scientific-calculator'],
    sources: [
      {
        claim: 'Classical probability axioms and combinatorics theorems.',
        source: 'Institute of Mathematical Statistics (IMS)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'probability',
    initialDefaults: {
      mode: 'ncr',
      n: 12,
      r: 5
    }
  },
  {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    category: 'math',
    badge: 'Phase 2',
    shortDescription: 'Add, subtract, multiply, and divide fractions with mixed numbers, common denominators, and instant reduction to simplest form.',
    metaTitle: 'Fraction Calculator — Free Add, Subtract, Multiply & Divide Fractions',
    metaDescription: 'Free online fraction calculator. Easily add, subtract, multiply, and divide fractions and mixed numbers with step-by-step common denominators and simplest form reductions.',
    primaryKeyword: 'fraction calculator',
    secondaryKeywords: ['fraction addition subtraction', 'simplify fractions', 'mixed numbers calculator'],
    directAnswer: 'A fraction calculator adds, subtracts, multiplies, and divides fractions and mixed numbers, providing full step-by-step working including finding the Least Common Denominator (LCD), converting improper fractions, and simplifying to lowest terms. It solves everyday math problems for students, woodworkers, and culinary recipes.',
    formulaHtml: `
      <p>Fraction Arithmetic Rules:</p>
      <div class="math-formula">
        <code>Addition: (a/b) + (c/d) = (ad + bc) ÷ bd</code><br />
        <code>Subtraction: (a/b) - (c/d) = (ad - bc) ÷ bd</code><br />
        <code>Multiplication: (a/b) × (c/d) = (a × c) ÷ (b × d)</code><br />
        <code>Division: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a × d) ÷ (b × c)</code>
      </div>
    `,
    workedExample: {
      title: 'Fraction Addition: 2/3 + 3/4',
      inputs: {
        'Fraction 1': '2/3',
        'Operation': 'Addition (+)',
        'Fraction 2': '3/4'
      },
      calculationHtml: `
        <p>1. Find Least Common Denominator (LCD) of 3 and 4 = 12</p>
        <p>2. Convert Fraction 1: (2 × 4) ÷ (3 × 4) = 8/12</p>
        <p>3. Convert Fraction 2: (3 × 3) ÷ (4 × 3) = 9/12</p>
        <p>4. Add numerators: (8 + 9) ÷ 12 = 17/12</p>
        <p>5. Convert to Mixed Number: 17 ÷ 12 = 1 with remainder 5 = <strong>1 5/12</strong></p>
        <p>6. Decimal Equivalent = 1.4167</p>
      `,
      result: 'Result: 17/12 (Mixed Number: 1 5/12 | Decimal: 1.4167)'
    },
    steps: [
      'Enter the numerator and denominator for the first fraction (or use mixed number inputs).',
      'Select the arithmetic operation: + (Add), − (Subtract), × (Multiply), or ÷ (Divide).',
      'Enter the second fraction.',
      'Review the step-by-step reduction, improper fraction, simplified mixed number, and decimal equivalent.'
    ],
    limitations: [
      'A fraction denominator cannot be zero (division by zero is mathematically undefined).',
      'Extremely large denominators with large prime factors are reduced using Euclidean Greatest Common Divisor (GCD) algorithms.'
    ],
    faqs: [
      {
        question: 'How do you find the Least Common Denominator (LCD)?',
        answer: 'The Least Common Denominator is the smallest positive number that is a common multiple of the denominators. For example, for denominators 4 and 6, the multiples of 4 are (4, 8, 12, 16...) and 6 are (6, 12, 18...), making 12 the LCD.'
      },
      {
        question: 'How do you divide two fractions?',
        answer: 'To divide fractions, multiply the first fraction by the reciprocal (the inverted fraction) of the second: (a/b) ÷ (c/d) = (a/b) × (d/c) = (ad) / (bc).'
      },
      {
        question: 'What is the difference between a proper fraction and an improper fraction?',
        answer: 'A proper fraction has a numerator smaller than its denominator (e.g. 3/4), representing a value less than 1. An improper fraction has a numerator greater than or equal to its denominator (e.g. 7/4), representing a value greater than or equal to 1.'
      },
      {
        question: 'How do you simplify a fraction to lowest terms?',
        answer: 'Divide both the numerator and the denominator by their Greatest Common Divisor (GCD). For example, for 8/12, the GCD is 4. Dividing both by 4 yields 2/3.'
      },
      {
        question: 'How does this tool connect to the Percentage Calculator?',
        answer: 'Every fraction represents a division that converts into a decimal and percentage. To convert fractions into percentage increase/decrease or parts of a whole, visit our Percentage Calculator.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'basic-math-calculator', 'algebra-equations-calculator', 'scientific-calculator'],
    sources: [
      {
        claim: 'Euclidean GCD algorithm and elementary fraction arithmetic proofs.',
        source: 'National Council of Teachers of Mathematics (NCTM)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'fraction',
    initialDefaults: {
      n1: 2,
      d1: 3,
      op: '+',
      n2: 3,
      d2: 4
    }
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    badge: 'Upgraded',
    shortDescription: 'Calculate percentage of a number, percentage increase and decrease, and percentage change between two values.',
    metaTitle: 'Percentage Calculator — Free Online Percentage, Change & Difference Tool',
    metaDescription: 'Free online percentage calculator. Calculate percentage of a number, percentage increase or decrease, and percentage difference with instant step-by-step formulas.',
    primaryKeyword: 'percentage calculator',
    secondaryKeywords: ['percentage change calculator', 'percentage increase decrease', 'percent of a number'],
    directAnswer: 'A percentage calculator solves all common percentage calculations: finding a percentage of a given number, calculating the percentage increase or decrease between two values, and finding what percentage one number is of another. It provides instant solutions for shopping discounts, salary raises, test scores, and financial returns.',
    formulaHtml: `
      <p>The Three Core Percentage Formulas:</p>
      <div class="math-formula">
        <code>1. Percentage of a Number: Value = (P ÷ 100) × X</code><br />
        <code>2. What % is X of Y?: Percentage (%) = (X ÷ Y) × 100</code><br />
        <code>3. Percentage Change: Change (%) = [(New Value - Old Value) ÷ |Old Value|] × 100</code>
      </div>
    `,
    workedExample: {
      title: 'Salary Increase Example: From $65,000 to $72,800',
      inputs: {
        'Old Value': '$65,000',
        'New Value': '$72,800',
        'Calculation': 'Percentage Increase'
      },
      calculationHtml: `
        <p>1. Absolute Difference = $72,800 - $65,000 = +$7,800</p>
        <p>2. Divide by original base: $7,800 ÷ $65,000 = 0.12</p>
        <p>3. Convert to percentage: 0.12 × 100 = <strong>+12.0% increase</strong></p>
      `,
      result: 'Percentage Increase: +12.0% (Gain of $7,800)'
    },
    steps: [
      'Select your calculation mode: Percentage of a number, Percentage Change, or X as % of Y.',
      'Enter the known values into the respective fields.',
      'The calculation executes instantaneously as you type.',
      'Review the written formula, fractional step, and copyable result.'
    ],
    limitations: [
      'Percentage change cannot be calculated when the starting baseline value is zero (division by zero).',
      'Be cautious of percentage points versus percentages (e.g. an interest rate rising from 4% to 5% is a 1 percentage point increase, but a 25% relative increase).'
    ],
    faqs: [
      {
        question: 'What is the difference between percentage and percentage points?',
        answer: 'A percentage point is the simple arithmetic difference between two percentages (e.g. 5% minus 4% = 1 percentage point). Percentage change measures the relative proportion of change: (5 - 4) ÷ 4 = a 25% increase.'
      },
      {
        question: 'How do you calculate a 20% discount on an item?',
        answer: 'Multiply the original price by 0.20 to find the discount amount, then subtract that from the original price. Alternatively, multiply the original price directly by 0.80 (100% - 20%) to find the final sale price.'
      },
      {
        question: 'Why does a 50% loss require a 100% gain to break even?',
        answer: 'If a $100 investment drops by 50%, you are left with $50. To return from $50 back to $100 requires adding $50, which is 100% of your remaining $50 capital. Losses have an asymmetrical mathematical impact on capital.'
      },
      {
        question: 'What is the formula for percentage decrease?',
        answer: 'Percentage decrease = [(Original Value - New Value) ÷ Original Value] × 100. For example, if a price drops from $80 to $60: ($80 - $60) ÷ $80 = 20 ÷ 80 = 0.25 × 100 = 25% decrease.'
      },
      {
        question: 'How does this tool connect to Shopping Tools?',
        answer: 'For in-store shopping calculations with sales tax, tips, and stackable coupons, use our Finance and Shopping Tools hub.'
      }
    ],
    relatedSlugs: ['finance-shopping-tools', 'fraction-calculator', 'basic-math-calculator', 'investment-roi-calculator'],
    sources: [
      {
        claim: 'Standard mathematical percentage and relative change calculation standards.',
        source: 'NIST Reference on Constants, Units, and Uncertainty',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'percentage',
    initialDefaults: {
      mode: 'change',
      v1: 65000,
      v2: 72800
    }
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'math',
    badge: 'Phase 2',
    shortDescription: 'Calculate college and high school semester and cumulative Grade Point Average (GPA) on standard 4.0 weighted and unweighted scales.',
    metaTitle: 'GPA Calculator — Free College & High School Grade Point Average Tool',
    metaDescription: 'Free online GPA calculator. Calculate your semester and cumulative GPA on a 4.0 unweighted or 5.0 weighted scale with credit hours, letter grades, and honors/AP weight.',
    primaryKeyword: 'GPA calculator',
    secondaryKeywords: ['grade calculator', 'cumulative GPA', 'weighted GPA', 'CGPA calculator'],
    directAnswer: 'A GPA calculator computes your semester and cumulative Grade Point Average (GPA) on a standard 4.0 unweighted scale or 5.0 weighted scale for Honors/AP/IB coursework. By multiplying each course’s numerical grade points by its credit hours and dividing by total credits attempted, it produces your official academic standing.',
    formulaHtml: `
      <p>Weighted Grade Point Average formula:</p>
      <div class="math-formula">
        <code>Quality Points per Course = Course Credit Hours × Grade Point Value</code><br />
        <code>Cumulative GPA = Total Quality Points ÷ Total Attempted Credit Hours</code>
      </div>
      <p>Standard 4.0 Grade Point Scale: A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D (1.0), F (0.0). (Weighted scales add +0.5 for Honors and +1.0 for AP/IB).</p>
    `,
    workedExample: {
      title: 'College Semester GPA (4 Courses / 14 Credits)',
      inputs: {
        'Course 1 (Calculus, 4 credits)': 'Grade: A (4.0 pts) → 16.0 quality pts',
        'Course 2 (Chemistry, 4 credits)': 'Grade: B+ (3.3 pts) → 13.2 quality pts',
        'Course 3 (History, 3 credits)': 'Grade: A- (3.7 pts) → 11.1 quality pts',
        'Course 4 (English, 3 credits)': 'Grade: B (3.0 pts) → 9.0 quality pts'
      },
      calculationHtml: `
        <p>1. Total Quality Points = 16.0 + 13.2 + 11.1 + 9.0 = 49.3 points</p>
        <p>2. Total Credit Hours = 4 + 4 + 3 + 3 = 14 credits</p>
        <p>3. Semester GPA = 49.3 ÷ 14 = <strong>3.52 GPA</strong></p>
      `,
      result: 'Semester GPA: 3.52 on a 4.0 Scale (Dean’s List Honors Standing)'
    },
    steps: [
      'Add your courses with course name, credit hours, and letter grade earned.',
      'Check "Weighted" if the course is Honors (+0.5) or Advanced Placement / IB (+1.0).',
      'Optionally input your prior cumulative GPA and prior credits to calculate new combined cumulative GPA.',
      'Review your exact GPA, total quality points, and academic honors standing.'
    ],
    limitations: [
      'Pass/Fail or Audited courses do not award quality points and are excluded from GPA calculation.',
      'Institutional grading policies vary (some universities do not recognize A+ as 4.3 or drop minus grades).'
    ],
    faqs: [
      {
        question: 'What is the difference between weighted and unweighted GPA?',
        answer: 'An unweighted GPA measures all courses on a standard 0 to 4.0 scale regardless of rigor. A weighted GPA awards extra points (typically +0.5 for Honors and +1.0 for AP, IB, or Dual Enrollment college courses), allowing GPAs up to 4.5 or 5.0 to reflect academic difficulty.'
      },
      {
        question: 'How do credit hours affect my GPA?',
        answer: 'Credit hours weight the impact of each grade. An "A" in a 4-credit laboratory course impacts your GPA twice as much as an "A" in a 2-credit seminar because it carries 16 quality points compared to 8.'
      },
      {
        question: 'How do I calculate cumulative GPA with past semesters?',
        answer: 'Multiply your prior cumulative GPA by your prior credit hours to find prior quality points. Add your new semester quality points and divide by your new total combined credit hours.'
      },
      {
        question: 'What GPA is typically required for Dean’s List or Latin Honors?',
        answer: 'Dean\'s List honors typically require a semester GPA of 3.50 or higher. Graduating Latin Honors usually begin at 3.50 (Cum Laude), 3.70 (Magna Cum Laude), and 3.90+ (Summa Cum Laude).'
      },
      {
        question: 'How does this tool connect to the Final Grade Calculator?',
        answer: 'While this GPA Calculator evaluates your overall degree and semester performance across multiple courses, our Final Grade Calculator helps you determine the exact test score needed on a final exam to secure a specific target course grade.'
      }
    ],
    relatedSlugs: ['final-grade-calculator', 'average-statistics-calculator', 'basic-math-calculator', 'percentage-calculator'],
    sources: [
      {
        claim: 'College Board and National Association of Student Financial Aid Administrators (NASFAA) grading standards.',
        source: 'College Board Academic GPA Calculation Guide',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'gpa',
    initialDefaults: {
      priorGpa: 3.4,
      priorCredits: 30,
      courses: [
        { name: 'Calculus I', credits: 4, grade: 'A', weight: 'none' },
        { name: 'Chemistry', credits: 4, grade: 'B+', weight: 'none' },
        { name: 'History', credits: 3, grade: 'A-', weight: 'none' },
        { name: 'English Lit', credits: 3, grade: 'B', weight: 'none' }
      ]
    }
  },
  {
    slug: 'final-grade-calculator',
    name: 'Final Grade Calculator',
    category: 'math',
    badge: 'Phase 2',
    shortDescription: 'Calculate the exact score you need on your final exam to achieve your desired target class grade.',
    metaTitle: 'Final Grade Calculator — What Do I Need on My Final Exam?',
    metaDescription: 'Free online final grade calculator. Find out exactly what score you need on your final exam to get an A, B, or C in your class based on your current grade and final exam weight.',
    primaryKeyword: 'final grade calculator',
    secondaryKeywords: ['what do I need on the final', 'grade goal calculator', 'final exam grade'],
    directAnswer: 'A final grade calculator computes the exact percentage score you must achieve on your final examination to earn your desired overall letter grade in a course. By factoring in your current course grade and the percentage weight assigned to the final exam, it removes exam anxiety and provides a clear academic target.',
    formulaHtml: `
      <p>Final Exam Required Score Formula:</p>
      <div class="math-formula">
        <code>Required Final Score = [Target Grade - (Current Grade × (1 - Final Weight))] ÷ Final Weight</code>
      </div>
      <p>Where weights are expressed as decimals (e.g. 25% final weight = 0.25, and (1 - Final Weight) = 0.75).</p>
    `,
    workedExample: {
      title: 'Aiming for an A (90%) with an 86% Current Grade and a 30% Final Exam',
      inputs: {
        'Current Course Grade': '86.0%',
        'Target Desired Grade': '90.0% (Grade A)',
        'Final Exam Weight': '30.0% (0.30)'
      },
      calculationHtml: `
        <p>1. Current grade contribution = 86.0% × (1 - 0.30) = 86.0 × 0.70 = 60.2%</p>
        <p>2. Remaining points needed = 90.0% - 60.2% = 29.8%</p>
        <p>3. Required Final Exam Score = 29.8% ÷ 0.30 = <strong>99.33%</strong></p>
      `,
      result: 'Required Score: 99.3% on the final exam to earn a 90.0% Course Grade'
    },
    steps: [
      'Enter your current overall class percentage grade (e.g. 86%).',
      'Enter the target letter grade or percentage you want to achieve (e.g. 90% for an A, 80% for a B).',
      'Input the percentage weight of the final exam (e.g. 20%, 30%, or 40%).',
      'Instantly see the exact percentage score required on the final exam to hit your target.'
    ],
    limitations: [
      'If the required score exceeds 100%, extra credit or an instructor grading curve is mathematically required to reach the target grade.',
      'Assumes all non-final course assignments (homework, quizzes, midterms) have already been graded.'
    ],
    faqs: [
      {
        question: 'What if the calculator says I need more than 100% on the final?',
        answer: 'If the required score exceeds 100%, it means that even a perfect score on the final exam will not raise your cumulative grade to your chosen target, unless your professor curves the class or offers extra credit.'
      },
      {
        question: 'What if the required score is negative?',
        answer: 'If the required score is 0% or negative, congratulations! You have already mathematically secured your target grade, meaning you could score zero on the final and still achieve your goal.'
      },
      {
        question: 'How do points-based grading systems differ from percentage weights?',
        answer: 'In a total points system, divide your current points by total points possible so far to get your current percentage, and divide the final exam points by the total course points to determine its percentage weight.'
      },
      {
        question: 'Can I calculate required scores for different grade boundaries (A, B, C)?',
        answer: 'Yes. Our tool displays a quick reference matrix showing the exact scores needed for an A (90%), B (80%), C (70%), and D (60%) simultaneously.'
      },
      {
        question: 'How does this tool connect to the GPA Calculator?',
        answer: 'Once you finalize your semester course letter grades, use our GPA Calculator to compute your official semester and cumulative Grade Point Average.'
      }
    ],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator', 'basic-math-calculator', 'average-statistics-calculator'],
    sources: [
      {
        claim: 'Weighted academic grading system standards and syllabus course assessment rules.',
        source: 'Association of American Colleges and Universities (AAC&U)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'final-grade',
    initialDefaults: {
      currentGrade: 86.0,
      targetGrade: 90.0,
      finalWeight: 30.0
    }
  }
];
