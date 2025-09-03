const ROLES = {
  AI_STRATEGY_CONSULTANT: {
    name: 'AI Strategy Consultant',
    description: 'Leads discovery, client communication, and high-level strategy.',
    rate: 150, // USD per hour
  },
  LEAD_AUTOMATION_ENGINEER: {
    name: 'Lead Automation Engineer',
    description: 'Designs the technical architecture and builds core automations.',
    rate: 125,
  },
  AUTOMATION_SPECIALIST: {
    name: 'Automation Specialist',
    description: 'Implements specific tasks and integrations using commercial tools.',
    rate: 90,
  },
  PROJECT_MANAGER: {
    name: 'Project Manager',
    description: 'Manages sprints, deliverables, and timelines.',
    rate: 85,
  },
  QA_TESTING_SPECIALIST: {
    name: 'QA & Testing Specialist',
    description: 'Ensures all automations work as expected before deployment.',
    rate: 70,
  },
};

module.exports = { ROLES };
