import { Input } from '../Input/Input';
import { BaseFormInput } from '../BaseFormInput';
import { AuthError } from '../../hooks/authInputs.context';

type CreateAccountFormType = {
  fullName: string;
  fullNameError: string | null;
  handleFullNameChange: (userName: string) => void;
  errors: AuthError | null;
};

export const CreateAccountForm = ({
  fullName,
  fullNameError,
  handleFullNameChange,
  errors,
}: CreateAccountFormType) => {
  return (
    <>
      <Input
        value={fullName}
        onChange={(e) => handleFullNameChange(e.target.value)}
        error={fullNameError}
        id="fullname"
        name="fullname"
        label="Full Name"
        type="fullname"
        placeholder="Jane Sommelier"
        autoComplete="name"
        required
      />

      <BaseFormInput errors={errors} />
    </>
  );
};
