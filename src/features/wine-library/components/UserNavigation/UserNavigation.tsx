import React, { useContext, useEffect } from 'react';
import styles from './UserNavigation.module.scss';
import clsx from 'clsx';
import { Logo } from '@/shared/components/Logo/Logo';
import { NavContent } from '@/shared/components/NavContent';
import { Icons } from '@/assets/icons';
import { Button } from '@/features/auth/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logOut } from '@/store/Auth/authLogInSlice';
import { User } from '@/features/auth/types/User';
import { UIModalContext } from '../../hooks/useUIModalContext';
import {
  deleteCurrentUser,
  setCurrentUser,
} from '@/store/Auth/currentUserSlice';
import { getUserInfo } from '@/utility/getUserInfo';
import { UserInfoBlock } from '@/shared/components/UserInfoBlock';
import { TITLE } from '@/shared/constants/context';

type UserNavigationProps = {};

export const UserNavigation: React.FC<UserNavigationProps> = () => {
  const currentUser = useAppSelector<User | null>((state) => state.currentUser);
  const { accessToken } = useAppSelector((state) => state.authLogIn);
  const { openMenu, setOpenMenu } = useContext(UIModalContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      const user: User = getUserInfo(accessToken);
      dispatch(setCurrentUser(user));
    }
  }, [accessToken, dispatch]);

  console.log('accessToken');
  console.log(accessToken);
  console.log(currentUser?.fullName);

  const signOutCurrentUser = async () => {
    dispatch(deleteCurrentUser());
    dispatch(logOut());
  };

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
        <Button onClick={signOutCurrentUser} variant="ghost" fullWidth={true}>
          {logOutBtn}
        </Button>
      </div>
    </div>
  );
};
