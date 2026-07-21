import { Navigate, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { LoginPageWrapper } from './pages/LogInPage/LoginPage';
import { CreateAccountPageWrapper } from './pages/CreateAccount/CreateAccountPage';

export const Root = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/login" replace />} />
          {/* <Route path="home" element={<Navigate to="/" replace />} /> */}
          <Route path="login" element={<LoginPageWrapper />} />
          <Route path="create-account" element={<CreateAccountPageWrapper />} />
          <Route path="library" element={<LibraryPage />} />
          {/* <Route path="favourites" element={<Favourites />} /> */}
          {/* <Route path=":productId" element={<ProductDetailsPage />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Provider>
  );
};
