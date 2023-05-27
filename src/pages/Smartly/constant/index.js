export const smartlyHeader = [
  {
    label: 'name',
    grid: 3,
  },
  {
    label: 'status',
    grid: 2,
  },

  {
    label: 'assignee',
    grid: 2,
  },
  {
    label: 'priority',
    grid: 1,
  },
  {
    label: 'due date',
    grid: 2,
  },
  {
    label: 'followers',
    grid: 1,
  },
  {
    label: '',
    grid: 1,
  },
];

export const smartlySummary = [
  {
    label: 'Created tasks',
    slug: 'tasks_created_this_week',
    previous: {
      label: 'created',
      slug: 'tasks_create_last_week',
    },
  },
  {
    label: 'Completed tasks',
    slug: 'completed_tasks',
    previous: {
      label: 'completed',
      slug: 'task_completed_last_week',
    },
  },
  {
    label: 'Tasks In-Progress',
    slug: 'task_in_progress',
  },
];
