import { BaseFormInput } from '../BaseFormInput/BaseFormInput';
import { AuthError } from '../../hooks/authInputs.context';

type LoginFormElementsType = {
  checkboxTitle: string;
  errors: AuthError | null;
};

export const LoginFormElements = ({ errors }: LoginFormElementsType) => {
  return (
    <>
      <BaseFormInput errors={errors} />
    </>
  );
};
