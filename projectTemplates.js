const { ROLES } = require('./roles');

const AI_CHATBOT_TEMPLATE = {
  id: 'AI_CHATBOT_IMPLEMENTATION',
  name: 'AI Chatbot for Customer Service',
  description: 'A comprehensive project to design, develop, and deploy an AI-powered chatbot to handle customer service inquiries.',
  sprints: [
    {
      name: 'Sprint 1: Discovery & Design',
      duration: '1 week',
      objective: 'Define project scope, user flows, and technical requirements.',
      tasks: [
        {
          name: 'Project Kick-off',
          totalHours: 4,
          subTasks: [
            { name: 'Conduct initial stakeholder interview to define goals.', hours: 2, assignedRole: ROLES.AI_STRATEGY_CONSULTANT },
            { name: 'Document project objectives and success metrics.', hours: 2, assignedRole: ROLES.PROJECT_MANAGER },
          ],
        },
        {
          name: 'Conversation Flow Mapping',
          totalHours: 8,
          subTasks: [
            { name: 'Map the "New User Welcome" conversation path.', hours: 2, assignedRole: ROLES.AI_STRATEGY_CONSULTANT },
            { name: 'Map the "Check Order Status" conversation path.', hours: 2, assignedRole: ROLES.AI_STRATEGY_CONSULTANT },
            { name: 'Map the "Billing Inquiry" conversation path.', hours: 2, assignedRole: ROLES.AI_STRATEGY_CONSULTANT },
            { name: 'Define the "Escalate to Human Agent" handover process.', hours: 2, assignedRole: ROLES.LEAD_AUTOMATION_ENGINEER },
          ],
          deliverable: 'A complete flowchart of the chatbot\'s conversations.',
        },
      ],
    },
    {
      name: 'Sprint 2: Development & Integration',
      duration: '2 weeks',
      objective: 'Build the chatbot and connect it to necessary systems.',
      tasks: [
        {
          name: 'Platform Setup (Basic - Commercial Tool)',
          totalHours: 6,
          subTasks: [
            { name: 'Configure the selected chatbot platform (e.g., Intercom, Drift).', hours: 2, assignedRole: ROLES.AUTOMATION_SPECIALIST },
            { name: 'Implement the "New User Welcome" flow.', hours: 2, assignedRole: ROLES.AUTOMATION_SPECIALIST },
            { name: 'Implement the "Check Order Status" flow with API lookup.', hours: 2, assignedRole: ROLES.LEAD_AUTOMATION_ENGINEER },
          ],
          deliverable: 'A functional prototype of the chatbot in a test environment.',
        },
        // Additional tasks for development would be listed here
      ],
    },
    // Additional sprints like "Sprint 3: Testing & Deployment" would follow
  ],
};

const PROJECT_TEMPLATES = {
  [AI_CHATBOT_TEMPLATE.id]: AI_CHATBOT_TEMPLATE,
};

module.exports = { PROJECT_TEMPLATES };
