import React from 'react';

import { HeaderProvider } from './context';

import Main from './views/Main';

export default function Header() {
  return (
    <HeaderProvider>
      <Main />
    </HeaderProvider>
  );
}
