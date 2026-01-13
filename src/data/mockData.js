export const kpiData = [
  {
    id: 1,
    label: 'Total Balance',
    value: '$124,500.00',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    id: 2,
    label: 'Total Spending',
    value: '$34,200.00',
    trend: '-2.4%',
    trendUp: false,
  },
  {
    id: 3,
    label: 'Pending Approvals',
    value: '12',
    trend: 'Requires Action',
    trendUp: null, // neutral or specific status
  },
]

export const spendingLimitsData = [
  {
    id: 1,
    category: 'SaaS Subscriptions',
    spent: 4500,
    limit: 5000,
    color: 'bg-indigo-500', // Using Tailwind classes mostly, but we might pass hex to chart if needed
  },
  {
    id: 2,
    category: 'Cloud Infrastructure',
    spent: 12000,
    limit: 15000,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    category: 'Marketing Ads',
    spent: 8500,
    limit: 10000,
    color: 'bg-emerald-500',
  },
  {
    id: 4,
    category: 'Office Supplies',
    spent: 1200,
    limit: 2000,
    color: 'bg-orange-500',
  },
]

export const balanceHistoryData = [
  { month: 'Jan', amount: 95000 },
  { month: 'Feb', amount: 102000 },
  { month: 'Mar', amount: 110000 },
  { month: 'Apr', amount: 124500, active: true },
  { month: 'May', amount: 118000 },
  { month: 'Jun', amount: 121000 },
]

export const transactionsData = [
  {
    id: 1,
    date: '2025-04-12',
    description: 'AWS Cloud Services',
    amount: 2450.0,
    status: 'Completed',
    user: {
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
  },
  {
    id: 2,
    date: '2025-04-11',
    description: 'Adobe Creative Cloud',
    amount: 54.99,
    status: 'Pending',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
  },
  {
    id: 3,
    date: '2025-04-10',
    description: 'WeWork Office Space',
    amount: 4500.0,
    status: 'Approved',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    },
  },
  {
    id: 4,
    date: '2025-04-10',
    description: 'Slack Subscription',
    amount: 850.0,
    status: 'Completed',
    user: {
      name: 'Mike Ross',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
  },
  {
    id: 5,
    date: '2025-04-09',
    description: 'Google Ads',
    amount: 1200.0,
    status: 'Rejected',
    user: {
      name: 'Rachel Zane',
      email: 'rachel@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
  },
  {
    id: 6,
    date: '2025-04-08',
    description: 'Figma Professional',
    amount: 45.0,
    status: 'Completed',
    user: {
      name: 'Harvey Specter',
      email: 'harvey@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    },
  },
  {
    id: 7,
    date: '2025-04-07',
    description: 'Zoom Video Communications',
    amount: 120.0,
    status: 'Review',
    user: {
      name: 'Louis Litt',
      email: 'louis@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
  },
  {
    id: 8,
    date: '2025-04-06',
    description: 'Github Enterprise',
    amount: 500.0,
    status: 'Completed',
    user: {
      name: 'Donna Paulsen',
      email: 'donna@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
  },
]
