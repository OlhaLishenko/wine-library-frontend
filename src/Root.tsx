import { Navigate, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { LoginPageWrapper } from './pages/LogInPage/LoginPage';
import { CreateAccountPageWrapper } from './pages/CreateAccount/CreateAccountPage';
import { ProductCard } from './features/wine-library/components/ProductCard';
import { Favorites } from './pages/Favorites';
import { LibraryPage } from './pages/LibraryPage';

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
          {/* <Route path="productCard" element={<ProductCard />} /> */}
          <Route path="favorites" element={<Favorites />} />
          {/* <Route path=":productId" element={<ProductDetailsPage />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Provider>
  );
};
