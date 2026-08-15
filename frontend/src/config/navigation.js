export const MODULES = [
  {
    id: 'overview',
    path: '/app/overview',
    label: 'Overview',
    description: 'Your financial snapshot',
    icon: 'overview',
  },
  {
    id: 'transactions',
    path: '/app/transactions',
    label: 'Transactions',
    description: 'Add & manage entries',
    icon: 'transactions',
  },
  {
    id: 'analytics',
    path: '/app/analytics',
    label: 'Analytics',
    description: 'Trends & breakdowns',
    icon: 'analytics',
  },
  {
    id: 'news',
    path: '/app/news',
    label: 'Finance News',
    description: 'Latest market headlines',
    icon: 'news',
  },
  {
    id: 'insights',
    path: '/app/insights',
    label: 'Insights',
    description: 'Tips & money wisdom',
    icon: 'insights',
  },
];

export function getModuleByPath(pathname) {
  return MODULES.find((m) => pathname.startsWith(m.path)) ?? MODULES[0];
}
