const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import the File System module

const { generateAllDocuments } = require('./documentGenerator');

const app = express();
const port = process.env.PORT || 3000;

// EJS Templating Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// --- Static File Serving ---
// Serve files from the 'public' directory
app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- API Endpoints ---

app.post('/api/generate-documents', async (req, res) => {
  try {
    const { name, email, companyName, projectType, region } = req.body;

    if (!name || !email || !companyName || !projectType || !region) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    console.log(`Generating documents for ${companyName}...`);

    // 1. Generate all documents in memory
    const generatedDocs = await generateAllDocuments(req.body);

    // 2. Create a unique directory for this request
    const timestamp = Date.now();
    const safeCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize company name
    const outputDir = path.join(__dirname, '..', 'public', 'generated', `${safeCompanyName}_${timestamp}`);
    fs.mkdirSync(outputDir, { recursive: true });

    // 3. Save each document as an HTML file
    const fileUrls = {};
    for (const docName in generatedDocs) {
      const filePath = path.join(outputDir, `${docName}.html`);
      fs.writeFileSync(filePath, generatedDocs[docName]);
      
      // 4. Construct the public URL for the file
      const urlPath = `/generated/${path.basename(outputDir)}/${docName}.html`;
      fileUrls[docName] = urlPath;
    }

    console.log(`Successfully saved documents to ${outputDir}`);

    // 5. Return the public URLs of the generated documents
    res.status(200).json({ 
      success: true, 
      message: 'Documents generated and saved successfully.',
      urls: fileUrls
    });

  } catch (error) {
    console.error('Error in /api/generate-documents:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate documents.' });
  }
});


// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('Backend server for document generation is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
