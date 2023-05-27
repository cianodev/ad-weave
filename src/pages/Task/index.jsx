import { TaskProvider } from 'pages/Task/Context';

import Main from 'pages/Task/views/Main';

import '../../assets/css/concept/task/overide.css';

export default function Task() {
  return (
    <TaskProvider>
      <Main />
    </TaskProvider>
  );
}
