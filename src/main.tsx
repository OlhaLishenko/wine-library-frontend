import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router';
import { Root } from './Root.tsx';
import './main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Root />
    </Router>
  </StrictMode>
);
