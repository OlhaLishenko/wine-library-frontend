import { SommelierAnswers } from '@/store/Poll/sommelierSlice';
import { IconPollName } from './IconPollName';
import { ChoiceOption } from './ChoiceOption';

export type QuestionKind = 'single' | 'multi' | 'abv';

export interface SommelierQuestion {
  id: keyof SommelierAnswers;
  kind: QuestionKind;
  eyebrow: string;
  title: string;
  subtitle: string;
  iconName: IconPollName;
  options: ChoiceOption[];
}
