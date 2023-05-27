import React from 'react';
// Context
import { ConceptOverviewProvider } from './context';

import Main from 'pages/ConceptOverview/views/Main';

export default function ConceptOverview() {
  return (
    <ConceptOverviewProvider>
      <Main />
    </ConceptOverviewProvider>
  );
}
