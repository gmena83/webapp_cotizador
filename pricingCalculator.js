const { ROLES } = require('./config/roles');
const { REGIONS } = require('./config/regions');

const BASE_PRICE = 2000; // A fixed base price for all projects.

/**
 * Calculates the total price and payment schedule for a given project.
 * @param {object} projectTemplate The project template object.
 * @param {string} regionId The ID of the client's region.
 * @returns {object} An object containing the total price and payment schedule.
 */
function calculatePricing(projectTemplate, regionId) {
  if (!projectTemplate) {
    throw new Error('A valid project template must be provided.');
  }
  if (!REGIONS[regionId]) {
    throw new Error(`Invalid region ID: ${regionId}`);
  }

  // 1. Calculate total hours per role
  const hoursByRole = {};
  projectTemplate.sprints.forEach(sprint => {
    sprint.tasks.forEach(task => {
      task.subTasks.forEach(subTask => {
        const roleId = Object.keys(ROLES).find(key => ROLES[key].name === subTask.assignedRole.name);
        if (!roleId) return;
        
        if (!hoursByRole[roleId]) {
          hoursByRole[roleId] = 0;
        }
        hoursByRole[roleId] += subTask.hours;
      });
    });
  });

  // 2. Calculate subtotal based on hourly rates, starting with the base price
  let roleBasedPrice = 0;
  for (const roleId in hoursByRole) {
    roleBasedPrice += hoursByRole[roleId] * ROLES[roleId].rate;
  }
  
  const subtotal = BASE_PRICE + roleBasedPrice;

  // 3. Apply regional multiplier
  const regionalMultiplier = REGIONS[regionId].multiplier;
  const totalPrice = Math.round(subtotal * regionalMultiplier); // Round to nearest dollar

  // 4. Calculate payment schedule (35% upfront, 30% milestone, 35% final)
  const paymentSchedule = {
    upfront: {
      percentage: 35,
      amount: Math.round(totalPrice * 0.35),
    },
    milestone: {
      percentage: 30,
      amount: Math.round(totalPrice * 0.30),
    },
    final: {
      percentage: 35,
      amount: 0, // Calculated last to avoid rounding errors
    },
  };
  // Ensure the total adds up correctly
  paymentSchedule.final.amount = totalPrice - paymentSchedule.upfront.amount - paymentSchedule.milestone.amount;

  return {
    totalPrice,
    paymentSchedule,
  };
}

module.exports = { calculatePricing };
