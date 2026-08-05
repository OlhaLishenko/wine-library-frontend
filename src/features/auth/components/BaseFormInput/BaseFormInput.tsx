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

  const onBlurEmail = () => {
    const emailEl = emailRef.current;
    if (emailEl?.validity.typeMismatch) {
      setEmailError('Invalid email format');
    } else if (emailEl?.validity.valid) {
      setEmailError('');
    }
  };

  const onBlurPassword = () => {
    const passwordEl = passwordRef.current;
    if (passwordEl?.validity.tooShort) {
      setPasswordError('Password is too short');
    } else if (passwordEl?.validity.valid) {
      setPasswordError('');
    }
  };

  const inputError = errors
    ? errors
    : { email: emailError, password: passwordError };

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
        error={inputError.email ?? emailError}
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
        error={inputError.password ?? passwordError}
        ref={passwordRef}
      />
    </>
  );
}
