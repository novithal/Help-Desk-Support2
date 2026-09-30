export const agents = [
  {
    id: 1,
    name: "Saranya Mohan",
    email: "saranya@helpdesk.com",
    role: "Senior Support Agent",
    status: "Online",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Manjula selvam",
    email: "manjula@helpdesk.com",
    role: "Support Agent",
    status: "Online",
    avatar: "MS",
  },
  {
    id: 3,
    name: "Elakiya Darun",
    email: "elakiya@helpdesk.com",
    role: "Support Agent",
    status: "Away",
    avatar: "ED",
  },
  {
    id: 4,
    name: "Divya vimal",
    email: "divya@helpdesk.com",
    role: "Support Agent",
    status: "Offline",
    avatar: "DV",
  },
];

export const categories = [
  "Technical",
  "Billing",
  "Account",
  "Product",
  "General",
];

export const initialTickets = [
  {
    id: "HD-1001",
    title: "Unable to login to customer portal",
    customer: "Jothi sekar",
    email: "jothi@example.com",
    category: "Technical",
    priority: "High",
    status: "Open",
    agent: "Saranya Mohan",
    created: "2026-09-25",
    updated: "2026-09-27",
    sla: 82,
    description:
      "Customer is unable to access the customer portal after entering valid login credentials.",
    comments: [
      {
        id: 1,
        user: "Saranya Mohan",
        text: "I am checking the authentication logs.",
        time: "10 minutes ago",
      },
    ],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 25, 2026 09:20 AM",
      },
      {
        text: "Assigned to Saranya Mohan",
        time: "Sep 25, 2026 09:35 AM",
      },
    ],
  },
  {
    id: "HD-1002",
    title: "Invoice amount is incorrect",
    customer: "Malathi Govind",
    email: "malathi@example.com",
    category: "Billing",
    priority: "Medium",
    status: "In Progress",
    agent: "Manjula Selvam",
    created: "2026-09-24",
    updated: "2026-09-27",
    sla: 64,
    description:
      "Customer reported a mismatch between the invoice amount and the subscription plan.",
    comments: [],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 24, 2026 11:10 AM",
      },
      {
        text: "Assigned to Manjula Selvam",
        time: "Sep 24, 2026 11:30 AM",
      },
    ],
  },
  {
    id: "HD-1003",
    title: "Need help changing account email",
    customer: "Revathi balu",
    email: "revathi@example.com",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    agent: "Elakiya Dharun",
    created: "2026-09-22",
    updated: "2026-09-26",
    sla: 35,
    description:
      "Customer requested assistance updating the email address associated with their account.",
    comments: [
      {
        id: 1,
        user: "Elakiya Dharun",
        text: "The email address has been successfully updated.",
        time: "Yesterday",
      },
    ],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 22, 2026 08:15 AM",
      },
      {
        text: "Ticket resolved",
        time: "Sep 26, 2026 04:40 PM",
      },
    ],
  },
  {
    id: "HD-1004",
    title: "Application crashes on startup",
    customer: "Priya Varun",
    email: "Priya@example.com",
    category: "Technical",
    priority: "Critical",
    status: "Open",
    agent: "Divya Vimal",
    created: "2026-09-26",
    updated: "2026-09-28",
    sla: 94,
    description:
      "The desktop application crashes immediately after the user launches it.",
    comments: [],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 26, 2026 01:25 PM",
      },
      {
        text: "Assigned to Divya Vimal",
        time: "Sep 26, 2026 01:40 PM",
      },
    ],
  },
  {
    id: "HD-1005",
    title: "Product feature request",
    customer: "Lavanya Gopal",
    email: "lavanya@example.com",
    category: "Product",
    priority: "Low",
    status: "Pending",
    agent: "Saranya Mohan",
    created: "2026-09-23",
    updated: "2026-09-27",
    sla: 48,
    description:
      "Customer requested an enhancement to the reporting module.",
    comments: [],
    activity: [
      {
        text: "Feature request submitted",
        time: "Sep 23, 2026 02:10 PM",
      },
    ],
  },
  {
    id: "HD-1006",
    title: "Password reset email not received",
    customer: "Dinesh Kumar",
    email: "dinesh@example.com",
    category: "Account",
    priority: "High",
    status: "In Progress",
    agent: "Manjula Selvam",
    created: "2026-09-27",
    updated: "2026-09-28",
    sla: 76,
    description:
      "Customer requested a password reset but has not received the reset email.",
    comments: [],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 27, 2026 10:00 AM",
      },
    ],
  },
  {
    id: "HD-1007",
    title: "Payment failed during checkout",
    customer: "Soniya Ganesh",
    email: "soniya@example.com",
    category: "Billing",
    priority: "Critical",
    status: "Open",
    agent: "Elakiya Dharun",
    created: "2026-09-28",
    updated: "2026-09-28",
    sla: 91,
    description:
      "Payment fails when the customer tries to complete the checkout process.",
    comments: [],
    activity: [
      {
        text: "Ticket created",
        time: "Sep 28, 2026 08:45 AM",
      },
    ],
  },
  {
    id: "HD-1008",
    title: "How can I export reports?",
    customer: "Dhanushya Manivannan",
    email: "Dhanushya@example.com",
    category: "General",
    priority: "Low",
    status: "Closed",
    agent: "Divya Vimal",
    created: "2026-09-20",
    updated: "2026-09-23",
    sla: 20,
    description:
      "Customer wants instructions for exporting reports from the dashboard.",
    comments: [],
    activity: [
      {
        text: "Ticket closed",
        time: "Sep 23, 2026 12:20 PM",
      },
    ],
  },
];

export const chartData = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 38 },
  { label: "Thu", value: 56 },
  { label: "Fri", value: 48 },
  { label: "Sat", value: 28 },
  { label: "Sun", value: 35 },
];