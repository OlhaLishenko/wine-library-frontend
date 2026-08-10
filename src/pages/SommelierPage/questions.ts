import { SommelierAnswers } from '@/store/Poll/sommelierSlice';

export type QuestionKind = 'single' | 'multi' | 'abv';

export interface ChoiceOption {
  value: string;
  label: string;
  hint?: string;
  /** Icon key resolved in the Questionnaire. Only wine-type options use one. */
  icon?: 'red' | 'white' | 'rose' | 'sparkling' | 'any';
}

export interface SommelierQuestion {
  /** Matches the key in SommelierAnswers (except `abv`, handled specially). */
  id: keyof SommelierAnswers;
  kind: QuestionKind;
  eyebrow: string;
  title: string;
  subtitle?: string;
  options?: ChoiceOption[];
}

export const questions: SommelierQuestion[] = [
  {
    id: 'sweetness',
    kind: 'single',
    eyebrow: 'The palate',
    title: 'How dry do you like it?',
    subtitle: 'Most food-friendly wines sit on the drier end.',
    options: [
      { value: 'dry', label: 'Bone dry', hint: 'Not a hint of sugar' },
      { value: 'offDry', label: 'Off-dry', hint: 'A whisper of sweetness' },
      { value: 'sweet', label: 'Sweet', hint: 'Dessert-leaning' },
      {
        value: 'any-option',
        label: 'No preference',
        hint: 'Let the wine decide',
      },
    ],
  },
  {
    id: 'body',
    kind: 'single',
    eyebrow: 'budget',
    title: 'Pick a budget.',
    subtitle: `What's your budget?`,
    options: [
      {
        value: 'low',
        label: 'Under $30',
        hint: '',
      },
      {
        value: 'medium',
        label: '$30 U+002d $75',
        hint: '',
      },
      {
        value: 'expensive',
        label: '$75 U+002d $150',
        hint: '',
      },
      {
        value: 'extraExpensive',
        label: '$150+',
        hint: '',
      },
    ],
  },
  {
    id: 'pairings',
    kind: 'multi',
    eyebrow: 'The table',
    title: 'What are you drinking with?',
    subtitle: `Choose any that apply — or none if it’s just the wine.`,
    options: [
      { value: 'meat', label: 'Red meat' },
      { value: 'fishSeafood', label: 'Fish & seafood' },
      { value: 'cheese', label: 'Cheese board' },
      { value: 'dessert', label: 'Dessert or just sipping' },
      { value: 'justWine', label: 'Just the wine' },
    ],
  },
  {
    id: 'abv',
    kind: 'abv',
    eyebrow: 'The strength',
    title: 'A comfortable alcohol range?',
    subtitle:
      'Lower ABV drinks lighter; higher tends to feel richer and warmer.',
  },
];
