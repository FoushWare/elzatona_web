const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve the raw YAML file
app.get('/swagger.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/x-yaml');
  res.sendFile(path.join(__dirname, 'swagger.yaml'));
});

// Serve JSON version
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// Root endpoint with links
app.get('/', (req, res) => {
  res.json({
    message: 'Elzatona Admin API Documentation',
    version: '1.0.0',
    endpoints: {
      swaggerUI: `http://localhost:${PORT}/api-docs`,
      swaggerYAML: `http://localhost:${PORT}/swagger.yaml`,
      swaggerJSON: `http://localhost:${PORT}/swagger.json`,
    },
    description:
      'Access the Swagger UI at /api-docs for interactive API documentation',
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 Swagger API Documentation Server running on http://localhost:${PORT}`
  );
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`📄 Swagger YAML: http://localhost:${PORT}/swagger.yaml`);
  console.log(`📄 Swagger JSON: http://localhost:${PORT}/swagger.json`);
});
