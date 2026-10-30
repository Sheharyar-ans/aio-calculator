import type { BlogPost } from '../blogPosts';

export const articleHomeAffordability: BlogPost = {
  slug: 'how-much-house-can-you-afford',
  title: 'How Much House Can You Afford? A Practical Guide to Home Affordability',
  metaTitle: 'How Much House Can You Afford? Salary Guide & Rules | AIO Calculator',
  metaDescription: 'Discover how much house you can afford based on salary, down payment, and debts using the 28/36 rule. Calculate your homebuying budget with our free tool.',
  publishDate: '2026-11-04',
  updateDate: '2026-11-04',
  author: 'AIO Calculator Financial Team',
  readingTime: '9 min read',
  summary: 'A step-by-step homebuyer guide covering the 28/36 DTI rule, salary-to-home benchmarks, down payment thresholds, closing costs, and emergency reserve planning.',
  relatedToolSlug: 'home-affordability-calculator',
  secondaryToolSlugs: ['mortgage-calculator', 'budget-calculator', 'debt-payoff-calculator'],
  keywords: [
    'how much house can I afford',
    'house affordability by salary',
    'down payment and monthly payment',
    'home buying budget'
  ],
  faqs: [
    {
      question: 'What is the standard rule of thumb for house affordability by salary?',
      answer: 'Lenders commonly follow the 28/36 debt-to-income (DTI) guideline. Your total monthly housing payment (PITI + HOA) should not exceed 28% of gross monthly income (front-end ratio), and total recurring debt payments (housing + student loans, car loans, credit cards) should not exceed 36% (back-end ratio).'
    },
    {
      question: 'How much house can I afford with an $80,000 salary?',
      answer: 'With an $80,000 annual gross salary ($6,667/month), 28% allows a maximum monthly housing cost of $1,867. Assuming a 6.5% interest rate, 20% down payment, and standard property taxes/insurance, this typically supports a purchase price between $280,000 and $325,000 depending on existing debts.'
    },
    {
      question: 'Why does existing non-mortgage debt reduce borrowing capacity so heavily?',
      answer: 'Lenders enforce the back-end DTI cap. If you earn $7,000 gross per month, your absolute debt ceiling at 36% is $2,520. If you have a $500 car note and $300 student loan, your available housing payment shrinks from $2,520 down to $1,720, cutting your purchasing power by over $120,000.'
    },
    {
      question: 'How does down payment size change monthly mortgage payments?',
      answer: 'A larger down payment lowers the principal borrowed and eliminates Private Mortgage Insurance (PMI) if reaching 20%. On a $400,000 home at 6.5%, putting 20% down ($80,000) results in a monthly P&I of $2,022.61, whereas putting 5% down ($20,000) increases P&I to $2,401.86 plus roughly $190/month in PMI.'
    },
    {
      question: 'What additional costs besides down payment must homebuyers budget for?',
      answer: 'Buyers need 2% to 5% of the loan amount for closing costs (title insurance, loan origination, appraisal, transfer taxes) plus 3 to 6 months of living expenses in an emergency cash reserve following closing.'
    }
  ],
  contentHtml: `
    <p class="direct-answer-lead">
      <strong>Direct Answer:</strong> You can afford a house where your total monthly housing cost (mortgage principal, interest, property taxes, homeowners insurance, and HOA fees) stays under 28% of your gross monthly income, with total monthly debt payments remaining below 36%. For a household earning $100,000 annually with moderate debts, this typically translates to an affordable home price between $350,000 and $420,000 depending on down payment and prevailing interest rates.
    </p>

    <h2>The 28/36 Rule: How Mortgage Lenders Evaluate Affordability</h2>
    <p>
      When underwriting conventional residential mortgages, underwriting guidelines established by Fannie Mae and Freddie Mac emphasize the <strong>Debt-to-Income (DTI) ratio</strong>. Financial planners and mortgage underwriters evaluate two critical percentages:
    </p>
    <div class="formula-box">
      <strong>Front-End DTI = (Total Monthly Housing Costs / Gross Monthly Income) &times; 100 &le; 28%</strong><br>
      <strong>Back-End DTI = (Total Housing Costs + Recurring Monthly Debts / Gross Monthly Income) &times; 100 &le; 36%</strong>
    </div>
    <p>
      <strong>Understanding Front-End Housing Costs (PITI + HOA):</strong>
    </p>
    <ul>
      <li><strong>P:</strong> Principal repayment.</li>
      <li><strong>I:</strong> Mortgage interest.</li>
      <li><strong>T:</strong> Municipal real estate property taxes.</li>
      <li><strong>I:</strong> Homeowners hazard insurance premium (and PMI if applicable).</li>
      <li><strong>HOA:</strong> Mandatory homeowners association or condo maintenance fees.</li>
    </ul>
    <p>
      While some government-backed programs (such as FHA loans) allow back-end DTI limits up to 43% (or even 50% with automated underwriting compensating factors), stretching beyond 36% severely restricts household discretionary cash flow, creating the classic "house-poor" predicament.
    </p>

    <h2>Salary to House Affordability Benchmarks</h2>
    <p>
      The table below provides a realistic reference model based on the standard 28% front-end guideline, assuming a 30-year fixed loan at 6.5% interest, 1.2% annual property tax rate, $1,200 annual insurance, and zero HOA dues:
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Annual Gross Salary</th>
            <th>Monthly Gross Income</th>
            <th>Max Monthly Housing (28%)</th>
            <th>Affordable Price (10% Down)</th>
            <th>Affordable Price (20% Down)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>$50,000</strong></td>
            <td>$4,167</td>
            <td>$1,167</td>
            <td>$155,000</td>
            <td>$185,000</td>
          </tr>
          <tr>
            <td><strong>$75,000</strong></td>
            <td>$6,250</td>
            <td>$1,750</td>
            <td>$245,000</td>
            <td>$290,000</td>
          </tr>
          <tr>
            <td><strong>$100,000</strong></td>
            <td>$8,333</td>
            <td>$2,333</td>
            <td>$335,000</td>
            <td>$395,000</td>
          </tr>
          <tr>
            <td><strong>$125,000</strong></td>
            <td>$10,417</td>
            <td>$2,917</td>
            <td>$425,000</td>
            <td>$500,000</td>
          </tr>
          <tr>
            <td><strong>$150,000</strong></td>
            <td>$12,500</td>
            <td>$3,500</td>
            <td>$515,000</td>
            <td>$605,000</td>
          </tr>
          <tr>
            <td><strong>$200,000</strong></td>
            <td>$16,667</td>
            <td>$4,667</td>
            <td>$695,000</td>
            <td>$815,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Worked Example: Real Calculation with Non-Mortgage Debt</h2>
    <p>
      Let us analyze a real-world scenario you can test right now in our <a href="/home-affordability-calculator/">Home Affordability Calculator</a>:
    </p>
    <ul>
      <li><strong>Annual Household Gross Salary:</strong> $110,000 ($9,166.67 per month)</li>
      <li><strong>Existing Monthly Debt Payments:</strong> $450 (car note) + $250 (student loan) = $700.00/month</li>
      <li><strong>Available Cash for Down Payment:</strong> $60,000.00</li>
      <li><strong>Estimated Interest Rate:</strong> 6.50% (30-year fixed)</li>
    </ul>
    <p>
      <strong>Calculation Steps:</strong>
    </p>
    <ol>
      <li><strong>Front-End Test (28% of $9,166.67):</strong> $2,566.67 max housing expense.</li>
      <li><strong>Back-End Test (36% of $9,166.67):</strong> $3,300.00 total debt limit. Subtracting $700 existing debts leaves <strong>$2,600.00</strong> available for housing.</li>
      <li>Underwriter chooses the lower of the two limits: <strong>$2,566.67 per month</strong>.</li>
      <li>Subtracting estimated property taxes ($380/mo) and insurance ($110/mo) leaves $2,076.67 for Principal & Interest.</li>
      <li>At 6.5% for 360 months, $2,076.67 supports a mortgage loan amount of <strong>$328,500.00</strong>.</li>
      <li>Adding the $60,000 down payment yields a <strong>Maximum Affordable Purchase Price of $388,500.00</strong>.</li>
    </ol>
    <p>
      <a href="/home-affordability-calculator/" class="btn btn-primary btn-sm">Calculate Your Personal Affordability &rarr;</a>
    </p>

    <h2>The Critical Role of Down Payment: 5% vs. 10% vs. 20%</h2>
    <p>
      While 20% down payment is the gold standard for avoiding Private Mortgage Insurance (PMI), many buyers purchase with 3% to 10% down. Here is how that choice alters your economics on a $400,000 purchase at 6.5%:
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Down Payment Tier</th>
            <th>Cash Required</th>
            <th>Loan Amount</th>
            <th>Monthly P&I</th>
            <th>Est. Monthly PMI</th>
            <th>Total Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>5% Down</strong></td>
            <td>$20,000.00</td>
            <td>$380,000.00</td>
            <td>$2,401.86</td>
            <td>$220.00</td>
            <td>$2,621.86</td>
          </tr>
          <tr>
            <td><strong>10% Down</strong></td>
            <td>$40,000.00</td>
            <td>$360,000.00</td>
            <td>$2,275.45</td>
            <td>$150.00</td>
            <td>$2,425.45</td>
          </tr>
          <tr>
            <td><strong>20% Down</strong></td>
            <td>$80,000.00</td>
            <td>$320,000.00</td>
            <td>$2,022.61</td>
            <td>$0.00</td>
            <td>$2,022.61</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Reaching 20% down saves <strong>$599.25 per month ($7,191 annually)</strong> in recurring housing costs compared to a 5% down payment.
    </p>

    <h2>Hidden Costs That Shrink Homebuying Budgets</h2>
    <ol>
      <li>
        <strong>Closing Costs (2% to 5%):</strong> On a $400,000 home, lender origination fees, title search, escrow reserves, and transfer stamps cost between $8,000 and $20,000 in cash.
      </li>
      <li>
        <strong>The 1% Annual Maintenance Rule:</strong> Single-family homes require roughly 1% to 2% of the home value each year ($4,000 to $8,000 annually) for HVAC maintenance, roof repairs, plumbing, and wear.
      </li>
      <li>
        <strong>Emergency Reserve Buffer:</strong> Do not drain your savings account to zero for the down payment. Lenders generally require 2 months of PITI reserves, and prudent financial planning dictates keeping a 3-to-6-month living fund.
      </li>
    </ol>

    <h2>Actionable Next Steps for Homebuyers</h2>
    <ol>
      <li>Run your numbers through our <a href="/home-affordability-calculator/">Home Affordability Calculator</a>.</li>
      <li>Model monthly amortization and extra payment scenarios using the <a href="/mortgage-calculator/">Mortgage Calculator</a>.</li>
      <li>Track your monthly debt load with the <a href="/debt-payoff-calculator/">Debt Payoff Calculator</a> to improve your back-end DTI before applying for pre-approval.</li>
    </ol>

    <div class="disclaimer-callout" style="margin-top: 2rem; padding: 1rem; background: var(--color-slate-100); border-left: 3px solid var(--color-slate-400); font-size: 0.85rem; color: var(--color-slate-600);">
      <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute a loan offer or mortgage pre-qualification. Interest rates, loan eligibility, and debt ratio limits vary by lender, credit score, loan program, and regional housing regulations.
    </div>
  `
};
