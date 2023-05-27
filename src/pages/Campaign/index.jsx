import React from 'react';
// Context
import { CampaignOverviewProvider } from './context';

import Main from 'pages/Campaign/views/Main';

export default function Campaign() {
  return (
    <CampaignOverviewProvider>
      <Main />
    </CampaignOverviewProvider>
  );
}
