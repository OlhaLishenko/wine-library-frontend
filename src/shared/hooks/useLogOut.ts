import { logOutUser, logOut } from '@/store/Auth/authLogInSlice';
import { deleteCurrentUser } from '@/store/Auth/currentUserSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router';

export function useLogOut() {
  const { refreshToken } = useAppSelector((state) => state.authLogIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOutCurrentUser = async () => {
    if (refreshToken) {
      await dispatch(logOutUser(refreshToken));
    } else {
      dispatch(logOut());
    }

    dispatch(deleteCurrentUser());

    navigate('/login');
  };

  return { signOutCurrentUser };
}
