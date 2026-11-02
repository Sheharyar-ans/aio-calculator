// Cluster B: Date, Time & Utility (time-date-calculator)

export const clusterB = [
  {
    slug: 'time-date-calculator',
    toolType: 'time-date-hub',
    dataDefaults: '{"activeTab":"age-calculator","birthDate":"1995-07-14","targetDate":"2026-10-30"}',
    hasHubNav: true,
    hubNavHtml: `<nav class="hub-nav" aria-label="Tool Sections"><a href="#age-calculator" class="hub-tab-btn">Age Calculator</a><a href="#date-difference" class="hub-tab-btn">Date Difference</a><a href="#day-counter" class="hub-tab-btn">Day Counter &amp; Business Days</a><a href="#time-zone-converter" class="hub-tab-btn">Time Zone Converter</a></nav>`,
    categoryName: 'Everyday Tools',
    categoryUrl: '/everyday-tools/',
    pageTitle: 'Time and Date Calculator: Duration & Business Days Tool',
    metaDescription: 'Calculate exact days, hours, and business days between dates with our free time and date calculator. Add or subtract calendar days, leap years, and weeks.',
    h1: 'Time and Date Calculator',
    capsuleText: 'A time and date calculator computes the exact duration between two calendar moments, measuring total elapsed days, weekdays, hours, and minutes. It accurately adjusts for leap years, month length variations, and optional non-working weekend exclusions to provide precise business day intervals.',
    firstViewportCta: 'Calculate your exact date difference, working days, or age above, or reference our practical chronological calculation rules below.',
    heroImage: {
      url: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Modern digital calendar and clock showing time and date calculation',
      title: 'Digital timepiece and calendar planner for elapsed duration calculation',
      caption: 'Accurate chronological duration calculation accounts for variable month lengths and leap years.'
    },
    infoImage: {
      url: 'https://images.pexels.com/photos/273081/pexels-photo-273081.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
      alt: 'Wall calendar planner showing business days and elapsed duration calculation',
      title: 'Monthly calendar view displaying business day deadlines',
      caption: 'Excluding weekends and statutory holidays provides reliable commercial delivery milestones.'
    },
    formulaHtml: `<div>
      <p>Chronological date mathematics adheres to the Gregorian astronomical calendar framework (ISO 8601 standard):</p>
      <div class="math-formula">
        <code>Total Elapsed Calendar Days = (Target Timestamp &minus; Start Timestamp) &divide; (1,000 &times; 60 &times; 60 &times; 24)</code><br />
        <code>Total Business Days = Total Days &minus; (Weekend Days: Saturdays &amp; Sundays) &minus; Statutory Holidays</code><br />
        <code>Leap Year Rule: Year is leap if (Year mod 4 == 0 AND Year mod 100 != 0) OR (Year mod 400 == 0)</code><br />
        <code>Total Elapsed Hours = Total Elapsed Days &times; 24</code>
      </div>
      <p style="margin-top: 0.75rem;">Step-by-step chronological duration calculation:</p>
      <ol style="margin-top: 0.5rem; line-height: 1.6;">
        <li>Convert starting and ending calendar dates into coordinated universal time (UTC) millisecond epoch integers to avoid local daylight saving anomalies.</li>
        <li>Subtract the initial timestamp from the destination timestamp to calculate gross elapsed duration.</li>
        <li>Iterate day boundaries between dates to classify Mondays through Fridays as commercial business days while filtering out weekend dates.</li>
        <li>Compute calendar year, month, and day modular remainders by adjusting for variable days in preceding months (28, 29, 30, or 31 days).</li>
      </ol>
    </div>`,
    workedExampleHtml: `<div class="example-card">
      <div class="example-card-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2563eb;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Worked Example: Business Days and Duration Between Dates</span>
      </div>
      <div style="font-size: 0.925rem; margin-bottom: 0.75rem;">
        <strong>Sample Date Range:</strong>
        <ul style="margin-top: 0.35rem; margin-bottom: 0.75rem;">
          <li><strong>Start Date:</strong> March 1, 2026</li>
          <li><strong>End Date:</strong> June 15, 2026</li>
          <li><strong>Weekend Exclusion:</strong> Saturdays and Sundays excluded</li>
        </ul>
      </div>
      <div style="font-size: 0.925rem; line-height: 1.6;">
        <p>1. Total calendar days elapsed: 106 total calendar days (March: 31 days, April: 30 days, May: 31 days, June: 14 days).</p>
        <p>2. Complete 7-day calendar weeks: 106 &divide; 7 = 15 full weeks with 1 leftover calendar day.</p>
        <p>3. Weekend filtering: 15 weeks &times; 2 weekend days = 30 weekend days.</p>
        <p>4. Net business working days: 106 total days minus 30 weekend days = <strong>76 business days</strong>.</p>
        <p>5. Elapsed hours and minutes: 106 days &times; 24 hours = <strong>2,544 total hours</strong> (152,640 minutes).</p>
      </div>
      <div class="example-result-pill">Result: 106 Calendar Days (3 Months, 14 Days) | 76 Working Business Days | 2,544 Total Hours</div>
    </div>`,
    howToUseHtml: `<ol>
      <li>Select your target tool module from the upper navigation tabs: Age Calculator, Date Difference, Day Counter, or Time Zone Converter.</li>
      <li>Pick your starting date and ending date using the interactive date pickers.</li>
      <li>Toggle the business days switch if you need to exclude Saturdays and Sundays for commercial contract and project deadlines.</li>
      <li>View your exact chronological breakdown in calendar years, months, weeks, days, hours, and business days.</li>
    </ol>`,
    tableSectionHtml: `<h2>Date Interval and Business Working Days Reference Matrix</h2>
    <p>This reference table illustrates typical quarterly, half-year, and annual project durations alongside expected business working days:</p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Time Horizon</th>
            <th>Total Calendar Days</th>
            <th>Average Business Days</th>
            <th>Total Elapsed Weeks</th>
            <th>Total Elapsed Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>30 Days (1 Month)</strong></td>
            <td>30 days</td>
            <td>21 to 22 business days</td>
            <td>4.28 weeks</td>
            <td>720 hours</td>
          </tr>
          <tr>
            <td><strong>60 Days (2 Months)</strong></td>
            <td>60 days</td>
            <td>42 to 44 business days</td>
            <td>8.57 weeks</td>
            <td>1,440 hours</td>
          </tr>
          <tr>
            <td><strong>90 Days (1 Quarter)</strong></td>
            <td>90 days</td>
            <td>64 to 65 business days</td>
            <td>12.85 weeks</td>
            <td>2,160 hours</td>
          </tr>
          <tr>
            <td><strong>180 Days (Half Year)</strong></td>
            <td>180 days</td>
            <td>128 to 130 business days</td>
            <td>25.71 weeks</td>
            <td>4,320 hours</td>
          </tr>
          <tr>
            <td><strong>365 Days (Common Year)</strong></td>
            <td>365 days</td>
            <td>260 to 261 business days</td>
            <td>52.14 weeks</td>
            <td>8,760 hours</td>
          </tr>
          <tr>
            <td><strong>366 Days (Leap Year)</strong></td>
            <td>366 days</td>
            <td>261 to 262 business days</td>
            <td>52.28 weeks</td>
            <td>8,784 hours</td>
          </tr>
          <tr>
            <td><strong>730 Days (2 Years)</strong></td>
            <td>730 days</td>
            <td>521 to 522 business days</td>
            <td>104.28 weeks</td>
            <td>17,520 hours</td>
          </tr>
        </tbody>
      </table>
    </div>`,
    limitationsHtml: `<ul>
      <li>Public and regional statutory bank holidays vary by country and province, requiring manual subtraction from standard Monday through Friday business day counts.</li>
      <li>Daylight saving time transitions add or subtract one physical hour on spring and autumn transition dates, which our UTC timestamps normalize for zero layout errors.</li>
      <li>Historical calendar dates preceding October 15, 1582 reflect Julian calendar reckoning rather than the modern Gregorian system.</li>
    </ul>`,
    inDepthSectionHtml: `<h2>Astronomical Timekeeping, ISO 8601 Standards, and Leap Year Mechanics</h2>
    <p>The modern civil calendar relies upon the Gregorian reform of 1582, designed to correct the Julian calendar drift against the vernal equinox. The mean tropical solar year lasts approximately 365.24219 days. By adding an extra leap day (February 29) every four years, while omitting leap days in century years not evenly divisible by 400 (such as 1700, 1800, and 1900), the Gregorian calendar maintains seasonal alignment to within one day every 3,236 years.</p>
    <p>When computing chronological age in years, months, and days, month-end boundary conditions present mathematical edge cases. For instance, calculating one month forward from January 31 lands on February 28 (or 29 in a leap year). Our algorithm applies standard ISO 8601 conventions, capping overflow days to the final valid day of the target month.</p>

    <h2>Business Days in Commercial Contracts and Project Management</h2>
    <p>In legal agreements, software engineering sprints, and financial instruments, commitments are almost universally specified in business days rather than calendar days. A 30 calendar day delivery window contains approximately 21 to 22 business days, while a 30 business day commitment extends across approximately 42 to 44 calendar days.</p>
    <p>Misunderstanding this fundamental distinction frequently leads to contractual friction and milestone slippage. By using our dedicated business day counter, contractors, attorneys, and procurement officers can forecast delivery schedules with mathematical certainty.</p>

    <h2>Three Practical Chronological Application Scenarios</h2>
    <div class="scenarios-grid" style="display: grid; gap: 1.5rem; margin-top: 1rem;">
      <div class="scenario-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem;">
        <h3 style="margin-top: 0; color: #0f172a;">Scenario 1: Commercial Contract Notice Period Execution</h3>
        <p>A commercial lease agreement requires a tenant to provide 60 business days of written notice prior to termination on November 30, 2026. Counting backwards across working weekdays while filtering out 24 weekend days establishes that written notice must be formally delivered no later than September 4, 2026, avoiding automatic contract renewal penalties.</p>
      </div>
      <div class="scenario-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem;">
        <h3 style="margin-top: 0; color: #0f172a;">Scenario 2: Software Development Sprint Milestone Planning</h3>
        <p>An engineering team launches a four-sprint delivery roadmap spanning 80 working days beginning February 2, 2026. By tracking business days and excluding 32 weekend days, the project delivery deadline calculates to May 22, 2026, enabling resource allocation and client milestone alignment.</p>
      </div>
      <div class="scenario-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem;">
        <h3 style="margin-top: 0; color: #0f172a;">Scenario 3: Biological Age and Exact Milestone Chronology</h3>
        <p>An individual born on July 14, 1995 computing their chronological age as of October 30, 2026 learns they have lived exactly 31 years, 3 months, and 16 days. This spans 11,431 calendar days, 274,344 total hours, and accounts for eight leap years traversed during their lifespan.</p>
      </div>
    </div>`,
    faqs: [
      {
        question: 'How do you calculate business days between two dates?',
        answer: 'To calculate business days, determine the total elapsed calendar days, count full 7-day weeks (which each contain 5 business days), add any remaining weekday days, and subtract statutory bank holidays.'
      },
      {
        question: 'How does the time and date calculator handle leap years?',
        answer: 'Our algorithm checks century and quadruple-century divisibility rules to account for February 29 during leap years, ensuring day counts, exact biological ages, and multi-year durations are mathematically accurate.'
      },
      {
        question: 'Can I add or subtract days from a future date?',
        answer: 'Yes. The Day Counter module allows you to add or subtract any number of calendar days or working business days from any chosen starting date to pinpoint precise project deadlines.'
      },
      {
        question: 'What is the difference between calendar days and working days?',
        answer: 'Calendar days include every consecutive 24-hour day from Monday through Sunday. Working days (business days) exclude Saturdays, Sundays, and non-working holidays.'
      },
      {
        question: 'How does time zone selection affect date difference calculations?',
        answer: 'All dates in this tool are processed in local device time or coordinated universal time (UTC) without external server calls, preventing unexpected day-shift errors across international borders.'
      },
      {
        question: 'How does this tool connect to the Sleep Calculator?',
        answer: 'While the Time and Date Calculator measures multi-day calendar spans, our Sleep Calculator optimizes intra-day circadian rhythm timing in 90-minute restorative cycles.'
      }
    ],
    relatedCalculators: [
      { url: '/sleep-calculator/', name: 'Sleep Calculator', desc: 'Calculate optimal bedtimes and wake-up schedules based on natural 90-minute sleep cycles.' },
      { url: '/pregnancy-due-date-finder/', name: 'Pregnancy Due Date Finder', desc: 'Calculate your estimated delivery date using Naegele rule and menstrual cycle length.' },
      { url: '/countdown-timer/', name: 'Countdown Timer', desc: 'Real-time countdown timer to any future date, event, or milestone with live days, hours, and minutes.' },
      { url: '/timezone-converter/', name: 'Timezone Converter', desc: 'Convert times across world time zones and compare international meeting schedules.' }
    ],
    sourceLine: '• Gregorian calendar astronomical standards, leap year algorithms, and ISO 8601 formatting: <em>International Organization for Standardization (ISO) &amp; US Naval Observatory</em> [Checked: Updated 2026]'
  }
];
