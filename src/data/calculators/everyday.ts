import type { CalculatorDefinition } from './types';

export const everydayCalculators: CalculatorDefinition[] = [
  {
    slug: 'time-date-calculator',
    name: 'Time and Date Calculator',
    category: 'everyday',
    badge: 'Hub',
    shortDescription: 'All-in-one time and date hub featuring an Age Calculator, Date Difference Finder, Day Counter, and Time Zone Converter.',
    metaTitle: 'Time and Date Calculator — Free Age, Date Difference & Day Counter Hub',
    metaDescription: 'Free online time and date calculator hub. Calculate your exact age in years/months/days, find duration between two dates, count business days, and convert time zones.',
    primaryKeyword: 'time and date calculator',
    secondaryKeywords: ['age calculator', 'date difference calculator', 'day counter', 'business days'],
    directAnswer: 'A time and date calculator computes chronological intervals between dates and times, including chronological age in years, months, and days, duration between two calendar dates, business work days excluding weekends and holidays, and world time differences. It combines all common temporal calculations into one fast, browser-based hub.',
    formulaHtml: `
      <p>Time and Date calculation rules:</p>
      <ul>
        <li><strong>Chronological Age:</strong> Target Date - Birth Date accounting for leap years and Gregorian calendar month variations.</li>
        <li><strong>Calendar Date Difference:</strong> Total elapsed days = (Date₂ - Date₁) in milliseconds ÷ (1000 × 60 × 60 × 24).</li>
        <li><strong>Business Days:</strong> Total calendar days minus Saturday and Sunday weekend days and observed federal holidays.</li>
      </ul>
    `,
    workedExample: {
      title: 'Age & Date Difference Example (Born July 14, 1995 evaluated on October 30, 2026)',
      inputs: {
        'Start / Birth Date': 'July 14, 1995',
        'End Date': 'October 30, 2026'
      },
      calculationHtml: `
        <p>1. Years elapsed: 2026 - 1995 = 31 years</p>
        <p>2. Months elapsed from July to October: 3 months</p>
        <p>3. Days elapsed from 14th to 30th: 16 days</p>
        <p>4. Total exact age: <strong>31 years, 3 months, 16 days</strong></p>
        <p>5. Total elapsed calendar days = <strong>11,431 days</strong> (or 274,344 hours)</p>
      `,
      result: 'Age: 31 Years, 3 Months, 16 Days (Total: 11,431 Days lived)'
    },
    steps: [
      'Select your desired tool tab: Age Calculator (#age-calculator), Date Difference (#date-difference), Day Counter (#day-counter), or Time Zone Converter (#time-zone-converter).',
      'Select starting and ending dates using the calendar pickers.',
      'Optionally toggle "Exclude Weekends" to count business working days.',
      'Review your exact duration broken down into years, months, weeks, days, hours, and minutes.'
    ],
    limitations: [
      'Gregorian calendar calculations before 1582 require Julian calendar conversion adjustments.',
      'Daylight Saving Time (DST) transitions create 23-hour or 25-hour days twice annually in participating jurisdictions.'
    ],
    faqs: [
      {
        question: 'How does the Age Calculator account for leap years?',
        answer: 'Our age calculation algorithms track exact calendar leap years (incorporating February 29 every 4 years, with century rules), ensuring your age in days and months is mathematically exact.'
      },
      {
        question: 'How do you calculate business days between two dates?',
        answer: 'The business day counter filters out Saturdays and Sundays from the date range, and allows you to exclude major public holidays, giving employers, lawyers, and contractors exact business delivery timelines.'
      },
      {
        question: 'Can I add or subtract days from a future date?',
        answer: 'Yes. The Day Counter tab lets you add or subtract an arbitrary number of days (e.g. 90 days or 180 business days) from any date to find the resulting deadline.'
      },
      {
        question: 'How does this hub relate to the standalone Countdown Timer?',
        answer: 'This hub calculates static intervals between two historical or future calendar dates. If you want a live, ticking real-time second-by-second countdown to a milestone, visit our standalone Countdown Timer.'
      },
      {
        question: 'What time zone is used for date calculations?',
        answer: 'All calculations automatically use your local device time zone without sending any timestamps to external servers, protecting your privacy.'
      }
    ],
    relatedSlugs: ['countdown-timer', 'timezone-converter', 'sleep-calculator', 'unit-conversion-calculator'],
    sources: [
      {
        claim: 'ISO 8601 calendar date and time representation standards.',
        source: 'International Organization for Standardization (ISO)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'time-date-hub',
    initialDefaults: {
      activeTab: 'age-calculator',
      birthDate: '1995-07-14',
      targetDate: '2026-10-30'
    },
    hubTabs: [
      { id: 'age-calculator', title: 'Age Calculator' },
      { id: 'date-difference', title: 'Date Difference' },
      { id: 'day-counter', title: 'Day Counter & Business Days' },
      { id: 'time-zone-converter', title: 'Time Zone Converter' }
    ]
  },
  {
    slug: 'unit-conversion-calculator',
    name: 'Unit and Conversion Calculator',
    category: 'everyday',
    badge: 'Hub',
    shortDescription: 'Comprehensive conversion hub for length, weight, volume, temperature, shoe sizes, and live multi-currency exchange rates.',
    metaTitle: 'Unit and Conversion Calculator — Free Imperial, Metric & Currency Converter',
    metaDescription: 'Free online unit conversion calculator hub. Convert length, weight, temperature, area, volume, international shoe sizes, and foreign currency exchange amounts.',
    primaryKeyword: 'unit converter',
    secondaryKeywords: ['unit conversion calculator', 'currency converter', 'shoe size converter', 'length weight temperature converter'],
    directAnswer: 'A unit and conversion calculator converts measurements between Metric and Imperial systems across physical dimensions—length, weight, volume, area, speed, and temperature—alongside practical utilities for international shoe size charts and foreign currency conversions. It ensures quick conversions without memorizing conversion factors.',
    formulaHtml: `
      <p>Key Unit Conversion Factors:</p>
      <ul>
        <li><strong>Length:</strong> 1 inch = 2.54 cm | 1 meter = 3.28084 feet | 1 mile = 1.60934 km</li>
        <li><strong>Weight / Mass:</strong> 1 pound (lb) = 0.453592 kg | 1 kg = 2.20462 lbs | 1 ounce = 28.3495 grams</li>
        <li><strong>Temperature:</strong> °C = (°F - 32) × 5/9 | °F = (°C × 9/5) + 32 | K = °C + 273.15</li>
        <li><strong>Volume:</strong> 1 US Gallon = 3.78541 Liters | 1 US Fluid Ounce = 29.5735 mL</li>
      </ul>
      <p><em>Note on Currency vs Inflation:</em> The Currency Converter tab on this page converts amounts between different world currencies at current exchange rates. If you want to calculate how purchasing power changes over time due to economic inflation, use our separate <a href="/currency-inflation-calculator/">Currency and Inflation Calculator</a>.</p>
    `,
    workedExample: {
      title: 'Multi-Unit Conversions Example',
      inputs: {
        'Length': '5 miles to kilometers',
        'Temperature': '68° Fahrenheit to Celsius',
        'Weight': '165 pounds to kilograms'
      },
      calculationHtml: `
        <p>1. Length: 5 miles × 1.609344 = <strong>8.0467 km</strong></p>
        <p>2. Temperature: (68°F - 32) × 5/9 = 36 × 5/9 = <strong>20.0°C</strong></p>
        <p>3. Weight: 165 lbs × 0.45359237 = <strong>74.84 kg</strong></p>
      `,
      result: '5 miles = 8.05 km | 68°F = 20.0°C | 165 lbs = 74.84 kg'
    },
    steps: [
      'Choose your tool tab: General Units (#general-units), Currency Converter (#currency-converter), or Shoe Sizes (#shoe-size-converter).',
      'Select the measurement dimension (Length, Weight, Temp, Volume, Area).',
      'Select your source unit and destination unit.',
      'Enter the numeric value to see conversions update instantly as you type.'
    ],
    limitations: [
      'Shoe size conversion tables vary between footwear manufacturers; shoe width (narrow, medium, wide) also impacts physical fit.',
      'Foreign currency rates fluctuate continuously during open global forex trading hours.'
    ],
    faqs: [
      {
        question: 'What is the difference between this Currency Converter and the Inflation Calculator?',
        answer: 'The Currency Converter on this page converts amounts between world currencies (such as USD, EUR, GBP, CAD, JPY) at current exchange rates. Our Currency and Inflation Calculator measures how domestic purchasing power erodes over years due to price inflation.'
      },
      {
        question: 'How do you convert Fahrenheit to Celsius in your head?',
        answer: 'A fast mental math shortcut: subtract 30 from the Fahrenheit temperature, then divide by 2. For example, 70°F minus 30 = 40; 40 ÷ 2 = ~20°C (exact is 21.1°C).'
      },
      {
        question: 'Why are US gallons different from UK Imperial gallons?',
        answer: 'A US liquid gallon is defined as 231 cubic inches (approx. 3.785 liters), whereas an Imperial gallon used historically in the UK and Canada is defined as 10 pounds of distilled water (approx. 4.546 liters), making the UK gallon roughly 20% larger.'
      },
      {
        question: 'How do international shoe sizes correspond between US, UK, and EU?',
        answer: 'Generally, US men\'s sizes are roughly 1 size larger than UK sizes (a US 10 is a UK 9), and correspond to EU 43-44. US women\'s sizes are roughly 2 sizes larger than UK sizes (a US 8 is a UK 6 / EU 38-39).'
      },
      {
        question: 'Are scientific conversion factors rounded in this calculator?',
        answer: 'Calculations use official NIST exact definitions (e.g. 1 inch is defined as exactly 25.4 mm), rounding results to 6 significant digits to balance engineering accuracy with readability.'
      }
    ],
    relatedSlugs: ['currency-inflation-calculator', 'steps-to-km-converter', 'geometry-calculator', 'basic-math-calculator'],
    sources: [
      {
        claim: 'NIST Special Publication 811 Guide for the Use of the International System of Units (SI).',
        source: 'National Institute of Standards and Technology (NIST)',
        url: 'https://www.nist.gov/pml/weights-and-measures',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'unit-conversion-hub',
    initialDefaults: {
      activeTab: 'general-units',
      unitCategory: 'length',
      fromUnit: 'mile',
      toUnit: 'km',
      val: 5
    },
    hubTabs: [
      { id: 'general-units', title: 'General Units (Metric & Imperial)' },
      { id: 'currency-converter', title: 'Currency Converter' },
      { id: 'shoe-size-converter', title: 'Shoe Size Converter' }
    ]
  },
  {
    slug: 'finance-shopping-tools',
    name: 'Finance and Shopping Tools',
    category: 'everyday',
    badge: 'Hub',
    shortDescription: 'All-in-one shopping and dining hub featuring a Tip Calculator with bill splitting, Discount & Sale Price Calculator, and Sales Tax Calculator.',
    metaTitle: 'Finance & Shopping Tools — Free Tip, Discount & Sales Tax Calculator Hub',
    metaDescription: 'Free online finance and shopping tools. Calculate restaurant tips and bill splits, percentage discounts with sale prices, and local sales tax in one convenient hub.',
    primaryKeyword: 'tip calculator',
    secondaryKeywords: ['discount calculator', 'sales tax calculator', 'bill split calculator', 'sale price calculator'],
    directAnswer: 'Finance and shopping tools provide daily retail and dining utilities: calculating restaurant tips with fair per-person bill splits, computing markdown discounts and double coupons, and determining state and municipal sales tax. It helps shoppers and diners calculate exact out-of-pocket costs instantly before checking out.',
    formulaHtml: `
      <p>Shopping and Dining Mathematical Formulas:</p>
      <ul>
        <li><strong>Tip Amount:</strong> Bill Total × (Tip % ÷ 100) | Per Person = (Bill + Tip) ÷ Party Size</li>
        <li><strong>Discounted Sale Price:</strong> Original Price × [1 - (Discount % ÷ 100)]</li>
        <li><strong>Sales Tax:</strong> Pre-Tax Price × (Sales Tax % ÷ 100) | Final Total = Pre-Tax Price + Tax</li>
      </ul>
    `,
    workedExample: {
      title: 'Restaurant Bill Split Example ($120 Bill, 18% Tip, 4 Diners)',
      inputs: {
        'Food & Drink Bill': '$120.00',
        'Tip Percentage': '18.0%',
        'Party Size': '4 people'
      },
      calculationHtml: `
        <p>1. Tip Amount = $120.00 × 0.18 = $21.60</p>
        <p>2. Total Bill with Tip = $120.00 + $21.60 = $141.60</p>
        <p>3. Per Person Share = $141.60 ÷ 4 = <strong>$35.40 each</strong></p>
      `,
      result: 'Total: $141.60 (Tip: $21.60 | Each Person Pays: $35.40)'
    },
    steps: [
      'Select your desired tool tab: Tip Calculator (#tip-calculator), Discount Calculator (#discount-calculator), or Sales Tax Calculator (#sales-tax-calculator).',
      'For tips: enter bill total, select tip percentage (15%, 18%, 20%), and specify party size for splitting.',
      'For discounts: enter original price and discount percentage or dollar markdown.',
      'For sales tax: enter the retail price and your local state/city sales tax rate.',
      'Review total savings and final out-of-pocket costs.'
    ],
    limitations: [
      'Tipping etiquette norms vary significantly by country (standard in the US/Canada, discretionary or included in service charges in Europe, discouraged in Japan).',
      'Certain municipal jurisdictions exempt specific grocery food items or clothing from sales tax.'
    ],
    faqs: [
      {
        question: 'What is the standard tipping percentage at restaurants?',
        answer: 'In the United States, 15% is standard for acceptable service, 18% to 20% is typical for good to excellent table service, and 10% is customary for takeout or buffet dining.'
      },
      {
        question: 'Should you tip on the pre-tax total or post-tax total?',
        answer: 'Etiquette experts and consumer advocates recommend tipping on the pre-tax subtotal of food and drinks, as sales tax is a government levy rather than service provided by waitstaff.'
      },
      {
        question: 'How do you calculate a double discount (e.g. 30% off plus an extra 20% off)?',
        answer: 'Double discounts apply sequentially, not additively. An item discounted 30% retains 70% of its price (0.70). An extra 20% off reduces that to 0.70 × 0.80 = 0.56, representing a total combined discount of 44%, not 50%.'
      },
      {
        question: 'How do you find original price from sale price?',
        answer: 'Divide the sale price by [1 - (discount percentage ÷ 100)]. For example, if a jacket on sale for 25% off costs $60: $60 ÷ (1 - 0.25) = $60 ÷ 0.75 = $80 original price.'
      },
      {
        question: 'How does this hub relate to the Percentage Calculator?',
        answer: 'This hub tailors percentage calculations to shopping, retail tax, and restaurant dining bills. For general abstract percentage changes and fractions, visit our Percentage Calculator.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'budget-calculator', 'unit-conversion-calculator', 'basic-math-calculator'],
    sources: [
      {
        claim: 'US restaurant tipping etiquette and state sales tax distribution standards.',
        source: 'National Restaurant Association & Tax Foundation',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'finance-shopping-hub',
    initialDefaults: {
      activeTab: 'tip-calculator',
      billAmount: 120,
      tipPercent: 18,
      partySize: 4
    },
    hubTabs: [
      { id: 'tip-calculator', title: 'Tip & Bill Split Calculator' },
      { id: 'discount-calculator', title: 'Discount & Sale Price Calculator' },
      { id: 'sales-tax-calculator', title: 'Sales Tax Calculator' }
    ]
  },
  {
    slug: 'home-vehicle-tools',
    name: 'Home and Vehicle Tools',
    category: 'everyday',
    badge: 'Hub',
    shortDescription: 'Practical automotive and household utility hub for calculating trip fuel costs, gas mileage (MPG), tire size dimensions, and home electricity usage costs.',
    metaTitle: 'Home and Vehicle Tools — Free Fuel Cost, Mileage, Tire & Electricity Hub',
    metaDescription: 'Free online home and vehicle tools. Calculate road trip fuel costs, vehicle fuel efficiency (MPG / L/100km), tire size differences, and home appliance electricity costs.',
    primaryKeyword: 'fuel cost calculator',
    secondaryKeywords: ['mileage calculator', 'tire size calculator', 'electricity cost calculator', 'trip cost calculator'],
    directAnswer: 'Home and vehicle tools provide essential automotive and residential utility calculations: trip fuel expenses, vehicle fuel efficiency (MPG vs L/100km), tire size diameter and speedometer discrepancies, and household appliance electricity consumption costs. It helps homeowners and drivers budget operating expenses accurately.',
    formulaHtml: `
      <p>Automotive and Household Formulas:</p>
      <ul>
        <li><strong>Trip Fuel Cost:</strong> (Trip Distance ÷ Vehicle MPG) × Fuel Price per Gallon</li>
        <li><strong>Fuel Economy (MPG):</strong> Miles Driven ÷ Gallons Consumed (or L/100km = [Liters × 100] ÷ Kilometers)</li>
        <li><strong>Tire Overall Diameter:</strong> [2 × (Section Width × Aspect Ratio ÷ 100) ÷ 25.4] + Wheel Rim Diameter in inches</li>
        <li><strong>Appliance Electricity Cost:</strong> [Watts × Hours Used per Day × Days ÷ 1,000] × Cost per kWh</li>
      </ul>
    `,
    workedExample: {
      title: 'Road Trip Fuel Cost Example (450 Miles, 28 MPG, $3.40 / Gallon)',
      inputs: {
        'Distance': '450 miles',
        'Vehicle Economy': '28 MPG',
        'Gas Price': '$3.40 / gallon'
      },
      calculationHtml: `
        <p>1. Gallons required = 450 miles ÷ 28 MPG = 16.07 gallons</p>
        <p>2. Total Fuel Cost = 16.07 gallons × $3.40 = <strong>$54.64</strong></p>
        <p>3. Cost per mile = $54.64 ÷ 450 = <strong>$0.121 per mile</strong></p>
      `,
      result: 'Total Fuel Cost: $54.64 (Consumes 16.1 Gallons | $0.12 per mile)'
    },
    steps: [
      'Select your tool tab: Fuel Cost (#fuel-cost), Mileage (#mileage), Tire Size (#tire-size), or Electricity Cost (#electricity-cost).',
      'For fuel: enter trip distance, vehicle fuel economy (MPG or L/100km), and fuel price per gallon or liter.',
      'For tires: enter existing and new tire size specifications (e.g. 225/45R17 vs 245/40R18).',
      'For electricity: enter appliance wattage, daily hours of use, and local electric utility rate per kilowatt-hour ($/kWh).',
      'View instant cost summaries and energy breakdowns.'
    ],
    limitations: [
      'Real-world vehicle fuel economy varies with aggressive driving, highway speed, vehicle cargo weight, and hilly topography.',
      'Electric utility rates often include tiered billing or seasonal peak-hour surcharges.'
    ],
    faqs: [
      {
        question: 'How do you calculate vehicle gas mileage (MPG)?',
        answer: 'Fill your fuel tank completely and record your odometer mileage. Drive normally until you need gas again, then refill completely and note the exact gallons pumped. Divide the miles driven by the gallons pumped to find your true MPG.'
      },
      {
        question: 'How does tire size change speedometer accuracy?',
        answer: 'If you install tires with a larger overall rolling diameter than factory specification, the tire covers more distance per revolution, causing your speedometer to read slower than your actual vehicle speed.'
      },
      {
        question: 'How much does it cost to run a space heater or air conditioner?',
        answer: 'A standard 1,500-watt space heater running for 8 hours daily at an average electricity rate of $0.16/kWh costs: (1.5 kW × 8 hrs) × $0.16 = $1.92 per day, or approximately $57.60 per month.'
      },
      {
        question: 'How does fuel economy compare between MPG and L/100km?',
        answer: 'In Miles Per Gallon (MPG), higher numbers are better (more distance per unit of fuel). In Liters per 100 Kilometers (L/100km), lower numbers are better (less fuel burned per fixed distance). To convert: L/100km = 235.215 ÷ MPG.'
      },
      {
        question: 'How does this hub relate to the Auto Loan Calculator?',
        answer: 'While this hub handles vehicle operating costs (gas, tires, mileage), our Auto Loan Calculator handles purchase financing, monthly payments, trade-ins, and loan interest.'
      }
    ],
    relatedSlugs: ['auto-loan-calculator', 'budget-calculator', 'unit-conversion-calculator', 'tech-security-tools'],
    sources: [
      {
        claim: 'US Department of Energy fuel economy and appliance energy consumption ratings.',
        source: 'Fueleconomy.gov & Energy.gov Appliance Standards',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'home-vehicle-hub',
    initialDefaults: {
      activeTab: 'fuel-cost',
      distance: 450,
      mpg: 28,
      fuelPrice: 3.40
    },
    hubTabs: [
      { id: 'fuel-cost', title: 'Fuel Cost Calculator' },
      { id: 'mileage', title: 'Mileage & MPG Converter' },
      { id: 'tire-size', title: 'Tire Size Comparison' },
      { id: 'electricity-cost', title: 'Electricity Cost Calculator' }
    ]
  },
  {
    slug: 'tech-security-tools',
    name: 'Tech and Security Tools',
    category: 'everyday',
    badge: 'Hub',
    shortDescription: 'Technical utility hub featuring a Cryptographic Password Generator, IPv4 Subnet Calculator, and Binary / Decimal / Hexadecimal Converter.',
    metaTitle: 'Tech and Security Tools — Free Password Generator, Subnet & Binary Hub',
    metaDescription: 'Free online tech and security tools. Generate cryptographically strong random passwords, calculate IPv4 CIDR subnets, and convert numbers between binary, hex, and decimal.',
    primaryKeyword: 'password generator',
    secondaryKeywords: ['IP subnet calculator', 'binary to hex converter', 'subnet mask calculator', 'strong password generator'],
    directAnswer: 'Tech and security tools provide essential digital utilities for developers, network administrators, and security-conscious internet users: generating cryptographically strong random passwords and passphrases in-browser, calculating IPv4 CIDR subnet network/broadcast addresses, and converting numbers between binary, decimal, and hexadecimal representations.',
    formulaHtml: `
      <p>Technical and Cryptographic Foundations:</p>
      <ul>
        <li><strong>Random Password Generation:</strong> Powered by <code>crypto.getRandomValues()</code> ensuring true cryptographic entropy without server transmission.</li>
        <li><strong>IPv4 CIDR Subnetting:</strong> Total Hosts = 2^(32 - Prefix) - 2 usable host addresses (reserving network ID and broadcast address).</li>
        <li><strong>Radix Conversion:</strong> Base-2 (Binary: 0,1) ↔ Base-10 (Decimal: 0–9) ↔ Base-16 (Hexadecimal: 0–9, A–F).</li>
      </ul>
    `,
    workedExample: {
      title: 'IPv4 Subnet Calculation: 192.168.1.0/26',
      inputs: {
        'Network IP': '192.168.1.0',
        'CIDR Prefix': '/26',
        'Subnet Mask': '255.255.255.192'
      },
      calculationHtml: `
        <p>1. Host bits = 32 - 26 = 6 bits</p>
        <p>2. Total IP addresses = 2⁶ = 64</p>
        <p>3. Usable host addresses = 64 - 2 = <strong>62 usable hosts</strong></p>
        <p>4. Network Address: <strong>192.168.1.0</strong></p>
        <p>5. Usable Host Range: <strong>192.168.1.1 to 192.168.1.62</strong></p>
        <p>6. Broadcast Address: <strong>192.168.1.63</strong></p>
      `,
      result: 'Subnet /26: 62 Usable Hosts | Range: 192.168.1.1 – 192.168.1.62 | Broadcast: 192.168.1.63'
    },
    steps: [
      'Select your tool tab: Password Generator (#password-generator), IP Subnet Calculator (#ip-subnet), or Binary / Hex Converter (#binary-hex).',
      'For passwords: choose password length (12 to 64 chars) and character sets (uppercase, lowercase, numbers, symbols).',
      'For subnets: enter an IPv4 address and choose your CIDR prefix (/8 to /30).',
      'For base conversion: type a decimal, binary, or hexadecimal string to see live multi-radix conversions.',
      'Copy output values with one click.'
    ],
    limitations: [
      'Generated passwords are created entirely in local client RAM and are never logged, cached, or transmitted across the network.',
      'IPv4 subnetting is modeled for classless CIDR notation (IPv6 uses 128-bit hexadecimal addressing).'
    ],
    faqs: [
      {
        question: 'Are passwords generated by this tool truly secure?',
        answer: 'Yes. Unlike weak math pseudo-random functions (like Math.random()), our tool uses the browser Web Cryptography API (`crypto.getRandomValues()`), the same cryptographic source used in operating systems and SSL/TLS key generation, running 100% locally on your machine.'
      },
      {
        question: 'What makes a password strong against brute-force attacks?',
        answer: 'Length and character entropy are paramount. A 16-character random password combining uppercase, lowercase, numbers, and symbols has over 95 bits of entropy, requiring billions of years for modern supercomputers to crack.'
      },
      {
        question: 'What is CIDR notation in IP networking?',
        answer: 'CIDR (Classless Inter-Domain Routing) notation specifies an IP address and its associated routing prefix using a slash followed by the count of leading network bits (e.g. /24 represents 255.255.255.0, leaving 8 host bits for 254 usable hosts).'
      },
      {
        question: 'Why does an IPv4 subnet subtract 2 from total addresses?',
        answer: 'In every IPv4 subnet, the first address (all host bits zero) is reserved to identify the network itself, and the last address (all host bits one) is reserved as the broadcast address, leaving 2^(32-prefix) - 2 addresses for assignable devices.'
      },
      {
        question: 'How do you convert binary to hexadecimal?',
        answer: 'Group binary digits into nibbles of 4 bits from right to left, and convert each 4-bit group into its single hexadecimal equivalent (e.g. 1101 1010 in binary = 1101 [D] and 1010 [A] = 0xDA in hex).'
      }
    ],
    relatedSlugs: ['unit-conversion-calculator', 'scientific-calculator', 'home-vehicle-tools', 'basic-math-calculator'],
    sources: [
      {
        claim: 'NIST Special Publication 800-63B Digital Identity & Password Guidelines.',
        source: 'National Institute of Standards and Technology (NIST)',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'tech-security-hub',
    initialDefaults: {
      activeTab: 'password-generator',
      passLength: 16,
      incUpper: true,
      incLower: true,
      incNum: true,
      incSym: true
    },
    hubTabs: [
      { id: 'password-generator', title: 'Cryptographic Password Generator' },
      { id: 'ip-subnet', title: 'IPv4 CIDR Subnet Calculator' },
      { id: 'binary-hex', title: 'Binary / Hex / Decimal Converter' }
    ]
  },
  {
    slug: 'sleep-calculator',
    name: 'Sleep Calculator',
    category: 'everyday',
    badge: 'Popular',
    shortDescription: 'Calculate optimal bedtimes and wake-up times based on natural 90-minute sleep cycles to wake up refreshed without morning grogginess.',
    metaTitle: 'Sleep Calculator — Free Bedtime, Wake-Up Time & Sleep Cycle Tool',
    metaDescription: 'Free online sleep calculator. Discover the best times to go to sleep or wake up based on natural 90-minute ultradian sleep cycles, avoiding sleep inertia and grogginess.',
    primaryKeyword: 'sleep calculator',
    secondaryKeywords: ['wake up time calculator', 'bedtime calculator', 'sleep cycle calculator', '90-minute sleep cycles'],
    directAnswer: 'A sleep calculator determines the ideal times to fall asleep or wake up based on natural 90-minute human sleep cycles (ultradian rhythms). Waking up at the conclusion of a full sleep cycle—rather than in the middle of deep REM sleep—prevents sleep inertia, ensuring you wake feeling alert and rejuvenated.',
    formulaHtml: `
      <p>Human Sleep Cycle Mathematics:</p>
      <div class="math-formula">
        <code>1 Sleep Cycle = 90 Minutes (1.5 Hours)</code><br />
        <code>Average Sleep Latency (time to fall asleep) = 15 Minutes</code><br />
        <code>Target Sleep Duration = (Cycles × 90 minutes) + 15 minutes</code>
      </div>
      <p>Recommended Adult Sleep Cycles: 5 cycles = 7.5 hours of sleep (7 hrs 45 min in bed) or 6 cycles = 9.0 hours of sleep (9 hrs 15 min in bed).</p>
    `,
    workedExample: {
      title: 'Target Wake-Up Time at 6:30 AM',
      inputs: {
        'Target Wake-Up': '6:30 AM',
        'Average Fall Asleep Time': '15 minutes'
      },
      calculationHtml: `
        <p>Counting backwards in 90-minute increments from 6:30 AM:</p>
        <p>1. 6 Cycles (9.0 hrs sleep): Bedtime = <strong>9:15 PM</strong> (In bed at 9:00 PM)</p>
        <p>2. 5 Cycles (7.5 hrs sleep — Ideal for most adults): Bedtime = <strong>10:45 PM</strong> (In bed at 10:30 PM)</p>
        <p>3. 4 Cycles (6.0 hrs sleep — Minimum acceptable): Bedtime = <strong>12:15 AM</strong> (In bed at 12:00 AM)</p>
      `,
      result: 'Best Bedtimes: 9:15 PM (6 cycles) or 10:45 PM (5 cycles) for 6:30 AM wake-up'
    },
    steps: [
      'Select your calculation goal: "I want to wake up at..." or "If I go to bed now...".',
      'Enter your desired wake-up time or bedtime.',
      'Review color-coded optimal sleep cycle suggestions (5 cycles = 7.5 hours recommended).',
      'Set your bedtime alarm 15 minutes before your chosen time to allow for natural sleep onset.'
    ],
    limitations: [
      'Sleep cycles vary individually from 70 to 110 minutes throughout the night, with early cycles containing more slow-wave sleep and later cycles containing more REM sleep.',
      'Sleep quality factors (caffeine, alcohol, blue screen light, sleep apnea) disrupt architectural sleep progression.'
    ],
    faqs: [
      {
        question: 'Why are 90-minute sleep cycles so important?',
        answer: 'During a 90-minute sleep cycle, your brain progresses through Stage 1 (light sleep), Stage 2, Stage 3 (deep slow-wave restorative sleep), and REM (dream sleep). Waking at the end of a cycle occurs during light sleep, minimizing morning grogginess.'
      },
      {
        question: 'What is sleep inertia?',
        answer: 'Sleep inertia is the physiological state of grogginess, impaired cognitive performance, and disorientation felt immediately after waking, caused when an alarm interrupts deep Stage 3 slow-wave delta sleep.'
      },
      {
        question: 'How many sleep cycles does an adult need per night?',
        answer: 'Most healthy adults need 5 full sleep cycles (7.5 hours of actual sleep) to 6 full cycles (9.0 hours of actual sleep) per 24-hour day for optimal cellular repair, immune health, and memory consolidation.'
      },
      {
        question: 'How long does the average person take to fall asleep?',
        answer: 'Clinical sleep studies show healthy individuals typically take 10 to 20 minutes to fall asleep (sleep latency). Falling asleep in under 5 minutes often indicates chronic sleep deprivation.'
      },
      {
        question: 'Why is this Sleep Calculator categorized under Everyday Tools rather than Health?',
        answer: 'Sleep timing is categorized under our Everyday Utility tools alongside time, alarms, and daily lifestyle rhythm planning, keeping daily scheduling utilities organized in one hub.'
      }
    ],
    relatedSlugs: ['time-date-calculator', 'countdown-timer', 'timezone-converter', 'fitness-workout-calculator'],
    sources: [
      {
        claim: 'National Sleep Foundation adult sleep architecture and cycle recommendations.',
        source: 'Sleep Health Journal & American Academy of Sleep Medicine',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'sleep',
    initialDefaults: {
      mode: 'wake',
      targetTime: '06:30'
    },
    hubTabs: [
      { id: 'wake-up-time', title: 'Wake-Up Time Calculator' },
      { id: 'bedtime-calculator', title: 'Bedtime Calculator' }
    ]
  },
  {
    slug: 'free-online-dice-roller-1-to-100',
    name: 'Free Online Dice Roller (1 to 100)',
    category: 'everyday',
    badge: 'Standalone',
    shortDescription: 'Roll virtual polyhedral dice (d4, d6, d8, d10, d12, d20, d100) and custom random numbers (1 to 100) with cryptographic fairness.',
    metaTitle: 'Free Online Dice Roller (1 to 100) — Virtual Polyhedral & D20 Dice Tool',
    metaDescription: 'Free online dice roller. Roll d4, d6, d8, d10, d12, d20, and d100 polyhedral dice or roll random numbers from 1 to 100 with cryptographic randomness and history log.',
    primaryKeyword: 'dice roller',
    secondaryKeywords: ['free online dice roller', 'roll dice 1 to 100', 'random dice roller'],
    directAnswer: 'The Free Online Dice Roller generates provably fair, cryptographically random dice rolls for tabletop gaming (D&D, RPGs, board games) and random number selection from 1 to 100. Supporting standard polyhedral dice—d4, d6, d8, d10, d12, d20, and percentile d100—it tracks roll history, modifiers (+/-), and multi-dice sums with zero lag.',
    formulaHtml: `
      <p>Cryptographic Uniform Randomness Generation:</p>
      <div class="math-formula">
        <code>Roll = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] ÷ 4294967296) × Sides) + 1</code><br />
        <code>Total Roll = Σ (Roll_i) + Modifier</code>
      </div>
    `,
    workedExample: {
      title: 'Dungeons & Dragons Advantage Attack Roll (2d20 + 5 modifier)',
      inputs: {
        'Dice': '2 × d20',
        'Modifier': '+5',
        'Rule': 'Advantage (take highest)'
      },
      calculationHtml: `
        <p>1. Die 1 rolled: 18</p>
        <p>2. Die 2 rolled: 12</p>
        <p>3. Advantage selects highest die: 18</p>
        <p>4. Add modifier: 18 + 5 = <strong>23 Total Attack Check</strong></p>
      `,
      result: 'Result: 23 (Die rolls: [18, 12] + 5 modifier)'
    },
    steps: [
      'Click any standard polyhedral die: d4, d6, d8, d10, d12, d20, or d100.',
      'Or set custom dice counts (e.g. 3d6) and custom range bounds (1 to 100).',
      'Add optional numerical modifiers (+3, -2).',
      'Click "Roll Dice" or press the Spacebar to trigger an animated roll.',
      'Inspect individual dice results, grand total sum, and the running roll history log.'
    ],
    limitations: [
      'Requires modern web browser JavaScript with Web Cryptography API support enabled.',
      'Dice rolls are generated on each client device without network lag.'
    ],
    faqs: [
      {
        question: 'Are dice rolls on this site truly random and fair?',
        answer: 'Yes. Unlike pseudo-random number generators (PRNG) that can be biased or predictable, this dice roller uses the browser\'s hardware-seeded Web Cryptography API (`crypto.getRandomValues`), providing uniform mathematical randomness identical to physical fair dice.'
      },
      {
        question: 'What is a d100 die?',
        answer: 'A d100 (percentile die) generates a random number from 1 to 100. In tabletop RPGs, it is often rolled using two 10-sided dice: one representing the tens digit (00–90) and one representing the ones digit (0–9).'
      },
      {
        question: 'What polyhedral dice are supported?',
        answer: 'We support all standard tabletop RPG dice: d4 (tetrahedron), d6 (cube), d8 (octahedron), d10 (pentagonal trapezohedron), d12 (dodecahedron), d20 (icosahedron), and custom numerical ranges from 1 to 100.'
      },
      {
        question: 'Can I roll multiple dice at once with modifiers?',
        answer: 'Yes. You can roll any quantity of dice (e.g. 4d6 drop lowest, 8d6 fireball damage) and apply positive or negative arithmetic modifiers.'
      },
      {
        question: 'Why did the old dice URL redirect here?',
        answer: 'Our previous blog post URL (/free-online-dice-roller/) has been permanently 301-redirected to this upgraded canonical tool page (/free-online-dice-roller-1-to-100/) to ensure a single, authoritative, high-performance dice roller.'
      }
    ],
    relatedSlugs: ['probability-data-calculator', 'average-statistics-calculator', 'basic-math-calculator', 'tech-security-tools'],
    sources: [
      {
        claim: 'W3C Web Cryptography API cryptographic randomness specification.',
        source: 'W3C Recommendation for Web Cryptography API',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'dice-roller',
    initialDefaults: {
      diceCount: 1,
      diceSides: 20,
      modifier: 0
    }
  },
  {
    slug: 'countdown-timer',
    name: 'Countdown Timer',
    category: 'everyday',
    badge: 'Phase 2',
    shortDescription: 'Real-time countdown timer to any future date, event, holiday, or milestone with live days, hours, minutes, and seconds.',
    metaTitle: 'Countdown Timer — Free Online Days Until & Event Countdown Tool',
    metaDescription: 'Free online countdown timer. Create a live, real-time countdown to birthdays, weddings, New Year, retirement, or exams with days, hours, minutes, and seconds.',
    primaryKeyword: 'countdown timer',
    secondaryKeywords: ['countdown calculator', 'days until date', 'time remaining calculator'],
    directAnswer: 'A countdown timer calculates the exact remaining time until a future calendar date, milestone, holiday, or deadline in real time, updating second by second. It converts the remaining duration into days, hours, minutes, and seconds, providing clear visual anticipation and deadline tracking.',
    formulaHtml: `
      <p>Real-Time Countdown Calculation:</p>
      <div class="math-formula">
        <code>Remaining Milliseconds = Target Timestamp - Current Timestamp</code><br />
        <code>Days = ⌊Remaining ms ÷ (1000 × 60 × 60 × 24)⌋</code><br />
        <code>Hours = ⌊(Remaining ms % Day) ÷ (1000 × 60 × 60)⌋</code><br />
        <code>Minutes = ⌊(Remaining ms % Hour) ÷ (1000 × 60)⌋</code><br />
        <code>Seconds = ⌊(Remaining ms % Minute) ÷ 1000⌋</code>
      </div>
    `,
    workedExample: {
      title: 'Countdown to New Year (Target: January 1, 2027 at 00:00:00 UTC)',
      inputs: {
        'Target Event': 'New Year 2027',
        'Target Date': 'January 1, 2027 00:00:00',
        'Current Date': 'October 30, 2026'
      },
      calculationHtml: `
        <p>1. Total days remaining: 63 days</p>
        <p>2. Time remaining: 63 days, 14 hours, 29 minutes, 54 seconds</p>
        <p>3. Total hours remaining: 1,526 hours</p>
        <p>4. Total seconds remaining: 5,495,394 seconds</p>
      `,
      result: '63 Days, 14 Hours, 29 Minutes, 54 Seconds remaining'
    },
    steps: [
      'Enter the title of your event (e.g. "Vacation", "Product Launch", "New Year").',
      'Select the target date and time using the calendar picker.',
      'The live timer starts ticking immediately, displaying days, hours, minutes, and seconds.',
      'Bookmark or share the customized event countdown link with friends or colleagues.'
    ],
    limitations: [
      'Relies on local system clock accuracy; if your computer or phone clock is set incorrectly, remaining seconds may reflect that offset.',
      'Events across time zones adjust automatically to the visitor\'s local time zone.'
    ],
    faqs: [
      {
        question: 'Does this countdown timer work when my browser tab is in the background?',
        answer: 'Yes. The timer calculates remaining duration using system timestamps rather than imprecise setInterval ticks, ensuring it stays 100% synchronized even when your phone screen locks or browser tab is minimized.'
      },
      {
        question: 'Can I create a shareable countdown link for an event?',
        answer: 'Yes. Our tool encodes the event name and target date into the URL anchor so you can copy and send the countdown link to friends, family, or coworkers.'
      },
      {
        question: 'How does daylight saving time affect countdowns?',
        answer: 'Because the countdown computes the absolute millisecond delta between two UTC timestamps, daylight saving transitions are seamlessly factored into the elapsed hours and days.'
      },
      {
        question: 'What happens when the countdown timer reaches zero?',
        answer: 'When the timer reaches zero, a celebratory banner appears announcing that the milestone has arrived, and the timer stops.'
      },
      {
        question: 'How does this tool connect to Time and Date Calculator?',
        answer: 'While this countdown timer runs live second-by-second for future events, our Time and Date Calculator analyzes static historical or future intervals, business day counts, and chronological age.'
      }
    ],
    relatedSlugs: ['time-date-calculator', 'timezone-converter', 'sleep-calculator', 'free-online-dice-roller-1-to-100'],
    sources: [
      {
        claim: 'UTC timestamp and ISO 8601 interval calculation specifications.',
        source: 'W3C Date and Time Formats',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'countdown',
    initialDefaults: {
      eventName: 'New Year',
      targetDate: '2027-01-01T00:00'
    }
  },
  {
    slug: 'timezone-converter',
    name: 'Timezone Converter',
    category: 'everyday',
    badge: 'Phase 2',
    shortDescription: 'Convert times across world time zones, schedule international meetings, and compare time differences across major global cities.',
    metaTitle: 'Timezone Converter — Free World Clock & Global Meeting Planner',
    metaDescription: 'Free online timezone converter. Easily convert meeting times between UTC, EST, PST, GMT, CET, IST, and Tokyo time zones with daylight saving adjustments.',
    primaryKeyword: 'timezone converter',
    secondaryKeywords: ['time zone converter', 'world time converter', 'time difference calculator'],
    directAnswer: 'A timezone converter translates local times across world time zones (UTC/GMT, Eastern, Pacific, Central European, India, Japan), accounting for daylight saving time (DST) shifts. It enables remote workers, international businesses, and travelers to schedule cross-border meetings without scheduling errors.',
    formulaHtml: `
      <p>Universal Time Coordinated (UTC) Conversion:</p>
      <div class="math-formula">
        <code>UTC Time = Local Time - Local UTC Offset</code><br />
        <code>Target City Time = UTC Time + Target City UTC Offset</code>
      </div>
      <p>Standard Global UTC Offsets: New York / EST (UTC-5 / EDT UTC-4), London / GMT (UTC+0 / BST UTC+1), Paris / CET (UTC+1 / CEST UTC+2), India / IST (UTC+5:30), Tokyo / JST (UTC+9), Sydney / AEST (UTC+10 / AEDT UTC+11).</p>
    `,
    workedExample: {
      title: 'Scheduling an International Call: 10:00 AM New York (EDT, UTC-4)',
      inputs: {
        'Origin Time': '10:00 AM New York (EDT, UTC-4)',
        'Target Cities': 'London (BST, UTC+1), New Delhi (IST, UTC+5:30), Tokyo (JST, UTC+9)'
      },
      calculationHtml: `
        <p>1. Convert to UTC: 10:00 AM EDT + 4 hrs = 14:00 UTC (2:00 PM UTC)</p>
        <p>2. London (UTC+1): 14:00 + 1 hr = <strong>3:00 PM (15:00 BST)</strong></p>
        <p>3. New Delhi (UTC+5:30): 14:00 + 5.5 hrs = <strong>7:30 PM (19:30 IST)</strong></p>
        <p>4. Tokyo (UTC+9): 14:00 + 9 hrs = <strong>11:00 PM (23:00 JST)</strong></p>
      `,
      result: '10:00 AM NYC = 3:00 PM London = 7:30 PM New Delhi = 11:00 PM Tokyo'
    },
    steps: [
      'Select your origin city or time zone.',
      'Pick the date and time you want to convert.',
      'Add target comparison cities (e.g. London, San Francisco, Singapore, Sydney).',
      'Drag the interactive 24-hour time slider to see overlapping business hours across all selected locations.'
    ],
    limitations: [
      'Daylight Saving Time (DST) changeover dates differ between the US (second Sunday in March) and Europe (last Sunday in March), creating 1 to 3 week temporary offset anomalies.',
      'Certain regions (e.g. India, Nepal, parts of Australia) use half-hour or 45-minute non-standard UTC offsets.'
    ],
    faqs: [
      {
        question: 'What is UTC and how does it relate to GMT?',
        answer: 'UTC (Coordinated Universal Time) is the global scientific atomic time standard. GMT (Greenwich Mean Time) is a historic solar time zone sharing the exact same current clock time as UTC (UTC+0).'
      },
      {
        question: 'Why do time differences change during March and October/November?',
        answer: 'Different countries start and end Daylight Saving Time on different weekends. The US changes clocks in early March, while the UK and European Union change in late March, temporarily altering time differences between New York and London by one hour for several weeks.'
      },
      {
        question: 'Which countries do not observe Daylight Saving Time?',
        answer: 'Over 60% of the world does not observe DST, including all of Japan, China, India, Singapore, most of Africa, and U.S. jurisdictions including Arizona (except Navajo Nation) and Hawaii.'
      },
      {
        question: 'What is the International Date Line?',
        answer: 'The International Date Line roughly follows the 180° meridian in the Pacific Ocean. Crossing it westward advances the calendar date by one full day; crossing it eastward moves the date back by one day.'
      },
      {
        question: 'How does this tool connect to Time and Date Calculator?',
        answer: 'While this tool focuses on multi-city world clock comparisons and meeting planning, our Time and Date Calculator handles age calculations and calendar day intervals.'
      }
    ],
    relatedSlugs: ['time-date-calculator', 'countdown-timer', 'sleep-calculator', 'unit-conversion-calculator'],
    sources: [
      {
        claim: 'IANA (Internet Assigned Numbers Authority) Time Zone Database (tzdata).',
        source: 'IANA Time Zone Database',
        url: 'https://www.iana.org/time-zones',
        date: 'Updated October 2026'
      }
    ],
    toolType: 'timezone',
    initialDefaults: {
      originTime: '10:00',
      originZone: 'America/New_York',
      targetZones: ['Europe/London', 'Asia/Kolkata', 'Asia/Tokyo']
    }
  }
];
