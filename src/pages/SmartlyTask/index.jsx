import React from 'react';
// Context
import Main from 'pages/SmartlyTask/views/Main';
import { SmartlyTaskProvider } from './context';

export default function SmartlyTask() {
  return (
    <SmartlyTaskProvider>
      <Main />
    </SmartlyTaskProvider>
  );
}
