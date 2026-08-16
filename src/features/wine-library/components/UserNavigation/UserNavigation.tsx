import React, { useContext, useEffect } from 'react';
import styles from './UserNavigation.module.scss';
import clsx from 'clsx';
import { Logo } from '@/shared/components/Logo/Logo';
import { NavContent } from '@/shared/components/NavContent';
import { Icons } from '@/assets/icons';
import { Button } from '@/shared/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logOut, logOutUser } from '@/store/Auth/authLogInSlice';
import { User } from '@/features/auth/types/User';
import { UIModalContext } from '../../hooks/useUIModalContext';
import {
  deleteCurrentUser,
  setCurrentUser,
} from '@/store/Auth/currentUserSlice';
import { getUserInfo } from '@/utility/getUserInfo';
import { UserInfoBlock } from '@/shared/components/UserInfoBlock';
import { TITLE } from '@/shared/constants/context';
import { useNavigate } from 'react-router';
import { useLogOut } from '@/shared/hooks/useLogOut';

type UserNavigationProps = {};

export const UserNavigation: React.FC<UserNavigationProps> = () => {
  const currentUser = useAppSelector<User | null>((state) => state.currentUser);
  const { accessToken, loading } = useAppSelector((state) => state.authLogIn);
  const { openMenu, setOpenMenu } = useContext(UIModalContext);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      const user: User = getUserInfo(accessToken);
      dispatch(setCurrentUser(user));
    }
  }, [accessToken, dispatch]);

  const { signOutCurrentUser } = useLogOut();

  // const signOutCurrentUser = async () => {
  //   if (refreshToken) {
  //     await dispatch(logOutUser(refreshToken));
  //   } else {
  //     dispatch(logOut());
  //   }

  //   dispatch(deleteCurrentUser());

  //   navigate('/login');
  // };

  const userEmail = currentUser ? currentUser.email : 'Unknown email';
  const userFullName = currentUser ? currentUser.fullName : 'Unknown user';
  const { logOutBtn } = TITLE.library;

  return (
    <div
      className={clsx(styles.userMenu, {
        [styles.isActive]: openMenu,
      })}
    >
      <div className={clsx(styles.userMenuContainer)}>
        <div className="container">
          <div className="modalHeader">
            <Logo showWordmark={true} direction="horizontal" />
            <button onClick={() => setOpenMenu(false)}>
              <Icons.Close />
            </button>
          </div>
        </div>
        <UserInfoBlock user={{ email: userEmail, fullName: userFullName }} />
        <div className="container">
          <NavContent variant="aside" />
        </div>
      </div>
      <div className="container">
        <Button
          onClick={signOutCurrentUser}
          variant="ghost"
          fullWidth={true}
          loading={loading}
        >
          {logOutBtn}
        </Button>
      </div>
    </div>
  );
};
