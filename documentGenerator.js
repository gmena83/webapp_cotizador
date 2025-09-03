const ejs = require('ejs');
const path = require('path');
const { PROJECT_TEMPLATES } = require('./config/projectTemplates');
const { SUBSCRIPTION_TIERS } = require('./config/subscriptions');
const { calculatePricing } = require('./pricingCalculator');

// Placeholder for legal text which the user will provide.
const LEGAL_TEXT = {
  serviceAgreementBody: '<p>[This is the placeholder for the main body of the Service Agreement. The user will provide the full legal text to replace this.]</p>',
  ndaBody: '<p>[This is the placeholder for the main body of the Non-Disclosure Agreement. The user will provide the full legal text to replace this.]</p>',
};

/**
 * Generates all necessary project documents as HTML.
 * @param {object} clientRequest The initial request data from the client.
 *   - {string} name
 *   - {string} email
 *   - {string} companyName
 *   - {string} projectType (e.g., 'AI_CHATBOT_IMPLEMENTATION')
 *   - {string} region (e.g., 'NORTH_AMERICA')
 * @returns {Promise<object>} An object where keys are document names and values are the generated HTML strings.
 */
async function generateAllDocuments(clientRequest) {
  const { name, companyName, projectType, region } = clientRequest;

  // 1. Select the project template
  const projectTemplate = PROJECT_TEMPLATES[projectType];
  if (!projectTemplate) {
    throw new Error(`Invalid project type: ${projectType}`);
  }

  // 2. Calculate the pricing
  const pricing = calculatePricing(projectTemplate, region);

  // 3. Consolidate all data for the templates
  const templateData = {
    client: clientRequest,
    project: projectTemplate,
    pricing: pricing,
    subscriptions: SUBSCRIPTION_TIERS,
    legal: LEGAL_TEXT,
  };

  // 4. List of templates to render
  const documentsToGenerate = [
    'estimate',
    'work-order',
    'service-agreement',
    'nda',
    'checklist',
  ];

  // 5. Render each template
  const generatedDocuments = {};
  for (const docName of documentsToGenerate) {
    const templatePath = path.join(__dirname, '..', 'views', `${docName}.ejs`);
    try {
      const html = await ejs.renderFile(templatePath, templateData);
      generatedDocuments[docName] = html;
    } catch (error) {
      console.error(`Error rendering template ${docName}.ejs:`, error);
      throw new Error(`Failed to generate document: ${docName}`);
    }
  }

  return generatedDocuments;
}

module.exports = { generateAllDocuments };
