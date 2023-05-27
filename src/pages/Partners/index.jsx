import React from 'react';
// Context
import { PartnersProvider } from './context';

import Main from 'pages/Partners/views/Main';

export default function Partners() {
  return (
    <PartnersProvider>
      <Main />
    </PartnersProvider>
  );
}
