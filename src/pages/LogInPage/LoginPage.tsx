import { bgImageLogin } from '@/assets/auth.images';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';
import { QUOTES, TITLE } from '@/shared/constants/context';
import { AuthFormLayout } from '@/features/auth/components/AuthFormLayout/AuthFormLayout';
import { LoginFormElements } from '@/features/auth/components/LoginFormElements/LoginFormElements';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logInUser } from '@/store/Auth/authLogInSlice';
import { useNavigate } from 'react-router';
import {
  AuthInputsContext,
  AuthInputsContextProvider,
} from '@/features/auth/hooks/authInputs.context';
import { useContext } from 'react';
import {
  ModalScreenContext,
  ModalScreenContextProvider,
} from '@/features/auth/hooks/modalScreen.context';

export function LoginPageWrapper() {
  return (
    <ModalScreenContextProvider>
      <AuthInputsContextProvider>
        <LoginPage />
      </AuthInputsContextProvider>
    </ModalScreenContextProvider>
  );
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.authLogIn);
  const { email, password, validate, errors } = useContext(AuthInputsContext);
  const { setOpenModal } = useContext(ModalScreenContext);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // let userInfo = { email, password };

      // const storagedUserInfo = localStorage.get('user');

      // if (storagedUserInfo) {
      //   userInfo = {
      //     email: storagedUserInfo.email,
      //     password: storagedUserInfo.password,
      //   };
      // }
      const result = await dispatch(logInUser({ email, password })).unwrap();
      console.log('LOGIN RESULT:', result);
      // localStorage.setItem("user", JSON.stringify(userInfo));
      navigate('/library');
    } catch (err) {
      console.log('LOGIN ERROR:', err);
      setOpenModal(true);
      return;
    }
  };

  return (
    <AuthLayout quote={QUOTES.login.quoteBg} bgImage={bgImageLogin}>
      <AuthFormLayout
        context={{
          title: TITLE.login.title,
          subtitle: TITLE.login.subtitle,
          submitBtnTitle: TITLE.login.submitBtnTitle,
          bottomFormTitle: TITLE.login.bottomFormTitle,
          bottomFormBtn: TITLE.login.bottomFormBtn,
        }}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <LoginFormElements
          checkboxTitle={TITLE.login.checkboxTitle}
          errors={errors}
        />
      </AuthFormLayout>
    </AuthLayout>
  );
}
