import React from 'react';

import { DashboardProvider } from 'pages/Dashboard/context';

import Main from 'pages/Dashboard/views/Main';

export default function Dashboard() {
  return (
    <DashboardProvider>
     <Main />
    </DashboardProvider>
  );
}
