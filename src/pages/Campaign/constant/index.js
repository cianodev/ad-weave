export const overviewDetails = [
  {
    label: 'Campaign Name',
    key: 'name',
    type: 'text',
  },
  {
    label: 'Concept Name',
    key: 'concept_name',
    type: 'text',
  },
  {
    label: 'Partner',
    key: 'partner_name',
    type: 'text',
  },
  {
    label: 'Channel',
    key: 'channel',
    type: 'icon',
  },
  {
    label: 'Delivery Type',
    key: 'delivery_type',
    type: 'text_replace',
  },
  {
    label: 'Date Created',
    key: 'created_at',
    type: 'text',
  },
  {
    label: 'Date Started',
    key: 'date_start',
    type: 'date_time',
  },
  {
    label: 'Delivery Date',
    key: 'delivery_date',
    type: 'date_time',
  },
  {
    label: 'Launch Date',
    key: 'launch_date',
    type: 'date_time',
  },
  {
    label: 'Personalization Type',
    key: 'personalization_type',
    type: 'text_replace',
  },
  {
    label: 'Service Type',
    key: 'service_type',
    type: 'text',
  },
];

export const taskTable = [
  {
    label: '',
    width: 27,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Parent Task Name',
    width: 300,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Assignee',
    width: 150,
    slug: 'assignee',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 150,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Due Date',
    width: 180,
    slug: 'due_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 180,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 150,
    slug: 'watchers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];
