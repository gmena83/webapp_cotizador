# Advanced Document Generation System

This project is a backend server that automatically generates a complete set of project documents based on a client request. It produces an estimate, a detailed work order, a service agreement, an NDA, and a deliverables checklist, all as styled, interactive HTML pages.

## Architecture & Features

This system is built with Node.js and Express.js. Its core functionality revolves around a powerful document generation engine.

1.  **Configuration-Driven:** All business logic—such as pricing rates, project tasks, and subscription features—is stored in simple JavaScript modules in `src/config`. This allows for easy updates without touching the core application code.
2.  **Dynamic Pricing:** The system automatically calculates a specific project price based on the required roles, estimated hours for each task, and a regional multiplier.
3.  **Template-Based Generation:** It uses EJS templates to create five distinct, client-ready and internal documents.
4.  **Modern Frontend Styling:** All generated HTML documents are styled with **Pico.css** for a modern, sleek, and minimalistic look.
5.  **Interactive HTML Output:** The system saves the generated documents as HTML files and serves them, providing shareable URLs for each.

## How to Configure the System

The "brain" of the generator lives in the `src/config` directory.

*   `src/config/roles.js`: Define the different job roles and their hourly rates here.
*   `src/config/regions.js`: Set the pricing multipliers for different geographical regions.
*   `src/config/projectTemplates.js`: This is the most important part. Create detailed project breakdowns here. You can add new templates for different services you offer. The system uses the `assignedRole` and `hours` for each sub-task to calculate the price.
*   `src/config/subscriptions.js`: Edit the features listed for your Basic and Premium subscription tiers.

You will also need to provide the master text for the legal documents by editing the `LEGAL_TEXT` object in `src/documentGenerator.js`.

> **IMPORTANT:** For the Service Agreement and NDA to be functional, you **must** open the `src/documentGenerator.js` file and replace the placeholder legal text inside the `LEGAL_TEXT` object with your own company's standardized legal clauses.

## API Endpoint

### `POST /api/generate-documents`
This is the main endpoint to trigger the document generation process.

*   **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "companyName": "Example Corp",
      "projectType": "AI_CHATBOT_IMPLEMENTATION",
      "region": "NORTH_AMERICA"
    }
    ```
    *   `projectType` must match an ID in your `projectTemplates.js` file.
    *   `region` must match a key in your `regions.js` file.

*   **Success Response (200)**:
    ```json
    {
      "success": true,
      "message": "Documents generated and saved successfully.",
      "urls": {
        "estimate": "/generated/Example_Corp_1678886400000/estimate.html",
        "work-order": "/generated/Example_Corp_1678886400000/work-order.html",
        "service-agreement": "/generated/Example_Corp_1678886400000/service-agreement.html",
        "nda": "/generated/Example_Corp_1678886400000/nda.html",
        "checklist": "/generated/Example_Corp_1678886400000/checklist.html"
      }
    }
    ```

## How to Run & Test
1.  Click the **"Run"** button in Replit. The server will start.
2.  Use a tool like `curl` or Postman to send a `POST` request to the `/api/generate-documents` endpoint with the required body data.
3.  Check the `public/generated` directory. A new folder will be created containing the five HTML documents.
4.  Access the documents using the URLs provided in the API response.
