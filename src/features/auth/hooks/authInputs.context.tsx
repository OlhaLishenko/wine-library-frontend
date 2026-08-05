import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

export type AuthError = {
  email: string;
  password: string;
};

type AuthInputsContextType = {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  validate: () => boolean;
  errors: AuthError | null;
  setErrors: Dispatch<SetStateAction<AuthError | null>>;
};

export const AuthInputsContext = createContext<AuthInputsContextType>({
  email: '',
  password: '',
  setEmail: () => {},
  setPassword: () => {},
  validate: () => false,
  errors: null,
  setErrors: () => {},
});

export const AuthInputsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthError | null>(null);

  const validate = () => {
    const nextErrors: AuthError | null = { email: '', password: '' };

    if (email.length === 0) {
      nextErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      nextErrors.email = 'Invalid email format';
    }

    if (password.length === 0) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 3) {
      nextErrors.password = 'Too short password';
    }

    const hasErrors = Object.values(nextErrors).some(Boolean);
    setErrors(hasErrors ? nextErrors : null);
    return !hasErrors;
  };

  const value = useMemo(
    () => ({
      email,
      password,
      setEmail,
      setPassword,
      validate,
      errors,
      setErrors,
    }),
    [email, password, errors]
  );

  return (
    <AuthInputsContext.Provider value={value}>
      {children}
    </AuthInputsContext.Provider>
  );
};
