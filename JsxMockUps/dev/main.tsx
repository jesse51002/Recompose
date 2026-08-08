// Dev-harness entry. See ./DevHarness.tsx for why this exists and why it lives
// outside `src/`.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DevHarness } from './DevHarness';

const host = document.getElementById('root');
if (host === null) throw new Error('dev harness: no #root in index.html');

createRoot(host).render(
  <StrictMode>
    <DevHarness />
  </StrictMode>,
);
