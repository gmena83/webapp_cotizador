const SUBSCRIPTION_TIERS = {
  BASIC: {
    name: 'Basic Subscription: Maintenance & Support',
    description: 'Keep your automation running smoothly with our essential support package.',
    features: [
      'Monthly Performance Reports: Receive a monthly summary of your automation\'s usage and health.',
      '24-Hour Support SLA: Guaranteed response time within one business day for any issues.',
      'Security & Platform Updates: We ensure your integrations are always up-to-date with the latest platform changes.',
      'Error Monitoring & Restart: We proactively monitor for errors and restart failed workflows.',
    ],
  },
  PREMIUM: {
    name: 'Premium Subscription: Continuous Improvement & Strategy',
    description: 'Go beyond maintenance. We will proactively enhance your automation to maximize its business impact and ROI.',
    features: [
      'All features from the Basic Subscription.',
      'Proactive Workflow Optimization: Each month, our team analyzes your automation\'s performance and implements one improvement to increase its efficiency or effectiveness.',
      'Quarterly Strategy Review Call: A 1-hour call every quarter to discuss your business goals and identify new opportunities for automation.',
      'A/B Testing of Key Processes: We can test variations of your workflows (e.g., different email copy, different logic paths) to find what works best.',
      'New Feature Implementation: As platforms release new features, we will proactively integrate them into your system.',
    ],
  },
};

module.exports = { SUBSCRIPTION_TIERS };
