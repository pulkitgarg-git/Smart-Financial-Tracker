export const INSIGHT_CATEGORIES = [
  { id: 'all', label: 'All topics' },
  { id: 'budgeting', label: 'Budgeting' },
  { id: 'investing', label: 'Investing' },
  { id: 'debt', label: 'Debt' },
  { id: 'habits', label: 'Habits' },
];

export const INSIGHTS = [
  {
    id: 'i1',
    category: 'budgeting',
    title: 'The 50/30/20 rule',
    readMinutes: 3,
    summary:
      'Split take-home pay: 50% needs, 30% wants, 20% savings and debt payoff. Adjust ratios if rent is high in your city.',
    body: 'Needs cover rent, utilities, groceries, and minimum debt payments. Wants are dining out, subscriptions, and hobbies. The 20% bucket builds your emergency fund, retirement, and extra debt payments. Track one month of spending before you set targets.',
  },
  {
    id: 'i2',
    category: 'budgeting',
    title: 'Zero-based budgeting',
    readMinutes: 4,
    summary:
      'Every dollar gets a job before the month starts. Income minus planned expenses should equal zero.',
    body: 'List all income sources, then assign amounts to categories until nothing is left unassigned. Surplus goes to goals; shortfall means cuts or income changes. Review weekly so small leaks do not compound.',
  },
  {
    id: 'i3',
    category: 'investing',
    title: 'Start with diversification',
    readMinutes: 5,
    summary:
      'Broad index funds spread risk across hundreds of companies. Avoid betting your future on a single stock.',
    body: 'A total market or S&P 500 index fund gives exposure to many sectors. Add bonds as you near goals that need stability. Match risk to timeline: money needed in 2 years should not be 100% equities.',
  },
  {
    id: 'i4',
    category: 'investing',
    title: 'Dollar-cost averaging',
    readMinutes: 3,
    summary:
      'Invest fixed amounts on a schedule to smooth out market volatility over time.',
    body: 'You buy more shares when prices are low and fewer when high, without trying to time the market. Automate transfers on payday so behavior stays consistent during scary headlines.',
  },
  {
    id: 'i5',
    category: 'debt',
    title: 'Avalanche vs snowball',
    readMinutes: 4,
    summary:
      'Avalanche saves the most interest (highest rate first). Snowball builds momentum (smallest balance first).',
    body: 'Mathematically, avalanche wins if you stick to it. Snowball helps when motivation matters more than a few extra dollars of interest. Pick one method and pay minimums on everything else.',
  },
  {
    id: 'i6',
    category: 'debt',
    title: 'Good debt vs bad debt',
    readMinutes: 3,
    summary:
      'Low-rate debt that builds assets (education, reasonable mortgage) differs from high-rate consumer debt.',
    body: 'Credit card balances at 20%+ APR destroy wealth fast. Prioritize paying those down while you still contribute enough to capture any employer 401(k) match.',
  },
  {
    id: 'i7',
    category: 'habits',
    title: 'Pay yourself first',
    readMinutes: 2,
    summary:
      'Move savings and investments right after payday, before discretionary spending.',
    body: 'Treat savings like a fixed bill. Automatic transfers remove willpower from the equation. Even small amounts compound when the habit is consistent.',
  },
  {
    id: 'i8',
    category: 'habits',
    title: 'Weekly money review',
    readMinutes: 3,
    summary:
      'Fifteen minutes every Sunday: check balances, upcoming bills, and one goal.',
    body: 'Open your tracker, reconcile transactions, and note any subscription you forgot. Small reviews prevent month-end surprises and keep you aligned with your plan.',
  },
];
