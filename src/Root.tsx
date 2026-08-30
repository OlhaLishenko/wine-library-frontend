import { Navigate, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { LoginPageWrapper } from './pages/LogInPage/LoginPage';
import { CreateAccountPageWrapper } from './pages/CreateAccount/CreateAccountPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SommelierPage } from './pages/SommelierPage';
import { PourPlanPage } from './pages/PourPlanPage/PourPlanPage';
import { MainLayout } from './layouts/MainLayout';

export const Root = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="login" element={<LoginPageWrapper />} />
          <Route path="create-account" element={<CreateAccountPageWrapper />} />

          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="wines/:id" element={<ProductDetailsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="sommelier" element={<SommelierPage />} />
            <Route path="plan-your-pour" element={<PourPlanPage />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Provider>
  );
};
