import React, { Suspense, lazy, Fragment } from 'react';

import _ from 'lodash';

import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

// App components
import SuspenseLoader from 'components/Common/SuspenseLoader';

import Task from 'pages/Task';

const Pager = lazy(() => import('components/Pager'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Profile = lazy(() => import('pages/Profile'));
const Project = lazy(() => import('pages/Project/index'));
const TimerSheet = lazy(() => import('pages/TimerSheet'));
const Support = lazy(() => import('pages/Support'));
const TaskRedirect = lazy(() => import('pages/Redirects/TaskRedirect'));
const Smartly = lazy(() => import('pages/Smartly'));
const SmartlyTask = lazy(() => import('pages/SmartlyTask'));
const ConceptOverview = lazy(() => import('pages/ConceptOverview'));
const Users = lazy(() => import('pages/Users'));
const Partners = lazy(() => import('pages/Partners'));

import useRouteGuard from 'hooks/useRouteGuard';

function Home() {
  const { path } = useRouteMatch();
  const location = useLocation();

  useRouteGuard();

  const background = location.state && location.state.background;

  return (
    <Fragment>
      <Suspense fallback={<SuspenseLoader />}>
        <Switch location={background || location}>
          <Route exact path={`${path}profile`}>
            <Pager content={<Profile />} title="User Profile" />
          </Route>

          {/* v1 task redirection */}
          <Route
            exact
            path={`${path}crm/admin/tasks/view/:oldId`}
            component={TaskRedirect}
          />

          <Route exact path={`${path}smartly`} component={Smartly} />

          <Route exact path={`${path}support`}>
            <Pager content={<Support />} title="Support" />
          </Route>

          <Route
            path={`${path}projects/:partnerId/concept/:conceptId/:type`}
            component={ConceptOverview}
          />

          <Route exact path={`${path}projects`} component={Project} />

          <Route exact path={`${path}users`}>
            <Pager content={<Users />} title="Ad-Weave Users" />
          </Route>

          <Route exact path={`${path}partners`}>
            <Pager content={<Partners />} title="Partner Groups" />
          </Route>

          <Route exact path={`${path}timesheet`} component={TimerSheet} />

          <Route path={`${path}`}>
            <Pager content={<Dashboard />} title="Dashboard" />
          </Route>
        </Switch>
        <Route path={`/task/:taskId`} component={Task} />
        <Route path={`/subtask/:taskId`} component={Task} />

        <Route path={`/smartly/:type/:taskId`} component={SmartlyTask} />
      </Suspense>
    </Fragment>
  );
}

export default Home;
