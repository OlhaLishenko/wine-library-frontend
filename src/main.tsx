import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router';
import { Root } from './Root.tsx';
import './main.scss';
import { UIModalProvider } from './features/wine-library/hooks/useUIModalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <UIModalProvider>
        <Root />
      </UIModalProvider>
    </Router>
  </StrictMode>
);
