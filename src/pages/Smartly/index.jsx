import React from 'react';
// Context
import { SmartlyProvider } from './context';

import Main from 'pages/Smartly/views/Main';

export default function Smartly() {
  return (
    <SmartlyProvider>
      <Main />
    </SmartlyProvider>
  );
}
