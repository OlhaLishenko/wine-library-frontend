import { SommelierQuestion } from '@/shared/types/SommelierQuestion';

export const questions: SommelierQuestion[] = [
  {
    id: 'sweetness',
    kind: 'single',
    eyebrow: 'Sweetness',
    title: 'How sweet do you like your wine?',
    subtitle: 'From very dry to sweet.',
    iconName: 'grapes',
    options: [
      {
        value: 'dry',
        label: 'Bone dry',
        icon: 'boneDry',
        filterValue: {
          code: 'DRY',
          name: 'Dry',
        },
      },
      {
        value: 'offDry',
        label: 'Off-dry',
        icon: 'offDry',
        filterValue: {
          code: 'OFF_DRY',
          name: 'Off-dry',
        },
      },
      {
        value: 'sweet',
        label: 'Sweet',
        icon: 'sweet',
        filterValue: {
          code: 'SWEET',
          name: 'Sweet',
        },
      },
      {
        value: 'any-option',
        label: 'No preference',
        icon: 'noPreference',
        filterValue: [],
      },
    ],
  },
  {
    id: 'budget',
    kind: 'single',
    eyebrow: 'Budget',
    title: 'How much would you like to spend?',
    subtitle: `We'll show you wines within your budget.`,
    iconName: 'moneyBag',
    options: [
      {
        value: 'low',
        label: 'Under $30',
        icon: 'budgetLow',
        filterValue: {
          minPrice: 10,
          maxPrice: 30,
        },
      },
      {
        value: 'medium',
        label: '$30 - $75',
        icon: 'budgetMedium',
        filterValue: {
          minPrice: 30,
          maxPrice: 75,
        },
      },
      {
        value: 'expensive',
        label: '$75 - $150',
        icon: 'budgetExpensive',
        filterValue: {
          minPrice: 75,
          maxPrice: 150,
        },
      },
      {
        value: 'extraExpensive',
        label: '$150+',
        icon: 'noPreference',
        filterValue: {
          minPrice: 150,
          maxPrice: 1000,
        },
      },
    ],
  },
  {
    id: 'food',
    kind: 'multi',
    eyebrow: 'Food',
    title: 'What are you drinking with?',
    subtitle: `Choose the food you want to pair with your wine.`,
    iconName: 'plate',
    options: [
      {
        value: 'meat',
        label: 'Red meat',
        icon: 'redMeat',
        filterValue: 'Meat',
      },
      {
        value: 'fishSeafood',
        label: 'Fish & seafood',
        icon: 'fishSeafood',
        filterValue: 'Seafood',
      },
      {
        value: 'cheese',
        label: 'Cheese board',
        icon: 'cheese',
        filterValue: 'Cheese',
      },
      {
        value: 'dessert',
        label: 'Dessert or just sipping',
        icon: 'dessert',
        filterValue: 'Dessert',
      },
    ],
  },
  {
    id: 'alcohol',
    kind: 'single',
    eyebrow: 'Alcohol',
    title: 'How rich do you like your wine?',
    subtitle: `From light and fresh to rich and full.`,
    iconName: 'glass',
    options: [
      {
        value: 'light',
        label: 'Light & delicate',
        icon: 'light',
        filterValue: { minAlcohol: 8, maxAlcohol: 11 },
      },
      {
        value: 'medium',
        label: 'Medium',
        icon: 'medium',
        filterValue: { minAlcohol: 11, maxAlcohol: 14 },
      },
      {
        value: 'full',
        label: 'Full & bold',
        icon: 'full',
        filterValue: { minAlcohol: 14, maxAlcohol: 20 },
      },
      {
        value: 'noPreference',
        label: 'No preference',
        icon: 'noPreference',
        filterValue: { minAlcohol: 8, maxAlcohol: 20 },
      },
    ],
  },
];
