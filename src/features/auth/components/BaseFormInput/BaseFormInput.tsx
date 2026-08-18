import { PasswordInput } from '../PasswordInput/PasswordInput';
import { Input } from '../../../../shared/components/Input/Input';
import { useContext, useRef, useState } from 'react';
import { AuthError, AuthInputsContext } from '../../hooks/authInputs.context';

type BaseFormInputType = {
  errors: AuthError | null;
};

export function BaseFormInput({ errors }: BaseFormInputType) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { email, password, setEmail, setPassword, setErrors } =
    useContext(AuthInputsContext);

  const getEmailError = (el: HTMLInputElement | null): string => {
    if (!el) return '';
    if (el.validity.valueMissing) return 'Email is required';
    if (el.validity.typeMismatch) return 'Invalid email format';
    return '';
  };

  const getPasswordError = (el: HTMLInputElement | null): string => {
    if (!el) return '';
    if (el.validity.valueMissing) return 'Password is required';
    if (el.validity.tooShort) return 'Password is too short';
    return '';
  };

  const onBlurEmail = () => setEmailError(getEmailError(emailRef.current));
  const onBlurPassword = () =>
    setPasswordError(getPasswordError(passwordRef.current));

  const emailErrorMessage = errors?.email || emailError;
  const passwordErrorMessage = errors?.password || passwordError;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
    setEmailError('');
    setErrors((prev: AuthError | null) => ({
      email: '',
      password: prev?.password || '',
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
    setPasswordError('');
    setErrors((prev: AuthError | null) => ({
      password: '',
      email: prev?.email || '',
    }));
  };

  return (
    <>
      <Input
        value={email}
        onChange={handleEmailChange}
        onBlur={onBlurEmail}
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@email.com"
        autoComplete="email"
        required
        error={emailErrorMessage}
        ref={emailRef}
      />

      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        onBlur={onBlurPassword}
        id="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        minLength={3}
        required
        error={passwordErrorMessage}
        ref={passwordRef}
      />
    </>
  );
}
