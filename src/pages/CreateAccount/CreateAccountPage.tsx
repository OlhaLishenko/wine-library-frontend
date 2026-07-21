import { images } from '@/assets/auth.images';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';
import { QUOTES, TITLE } from '@/constants/context';
import { AuthFormLayout } from '@/features/auth/components/AuthFormLayout/AuthFormLayout';
import { CreateAccountForm } from '@/features/auth/components/CreateAccountForm/CreateAccountForm';
import {
  AuthInputsContext,
  AuthInputsContextProvider,
} from '@/features/auth/hooks/authInputs.context';
import { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router';
import { registerUser } from '@/store/Auth/authRegisterSlice';
import { logInUser } from '@/store/Auth/authLogInSlice';
import { ModalScreen } from '@/features/auth/components/ModalScreen';
import {
  ModalScreenContext,
  ModalScreenContextProvider,
} from '@/features/auth/hooks/modalScreen.context';
import { fullNameValidate } from '@/utility/fullNameValidate';

export function CreateAccountPageWrapper() {
  return (
    <ModalScreenContextProvider>
      <AuthInputsContextProvider>
        <CreateAccountPage />
      </AuthInputsContextProvider>
    </ModalScreenContextProvider>
  );
}

export function CreateAccountPage() {
  const bgImage = {
    mobile: images.createAccount.createAccbgMobile,
    tablet: images.createAccount.createAccbgMobile,
    desktop: images.createAccount.createAccbgDesktop,
  };

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.authRegister);
  const { email, password, validate, errors } = useContext(AuthInputsContext);
  const { openModal, setOpenModal } = useContext(ModalScreenContext);

  const handleFullNameChange = (userName: string) => {
    const error = fullNameValidate(userName);
    setFullNameError(error);
    setFullName(userName.trim());
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = fullNameValidate(fullName);
    setFullNameError(error);

    if (!validate()) {
      return;
    }

    try {
      await dispatch(registerUser({ email, password, fullName })).unwrap();
    } catch {
      setOpenModal(true);
      return;
    }

    try {
      await dispatch(logInUser({ email, password })).unwrap();
      navigate('/library');
    } catch {
      setOpenModal(true);
      navigate('/login');
    }
  };
  return (
    <AuthLayout quote={QUOTES.createAccount.quoteBg} bgImage={bgImage}>
      <AuthFormLayout
        context={{
          title: TITLE.createAccount.title,
          subtitle: TITLE.createAccount.subtitle,
          submitBtnTitle: TITLE.createAccount.submitBtnTitle,
          bottomFormTitle: TITLE.createAccount.bottomFormTitle,
          bottomFormBtn: TITLE.createAccount.bottomFormBtn,
        }}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <CreateAccountForm
          fullName={fullName}
          fullNameError={fullNameError}
          handleFullNameChange={handleFullNameChange}
          errors={errors}
        />
      </AuthFormLayout>
      {openModal && error && <ModalScreen message={error} />}
    </AuthLayout>
  );
}
