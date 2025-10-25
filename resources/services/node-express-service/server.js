import express from 'express';
const app = express();

// Basic root endpoint
app.get('/', (req, res) => {
  res.send(`
    <h2>Node Express Service</h2>
    <p>This service is running successfully on <strong>Google Cloud Run</strong>.</p>
    <p>Environment: ${process.env.NODE_ENV || 'production'}</p>
    <p>Region: ${process.env.GCP_REGION || 'europe-north1'}</p>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'node-express-service',
    timestamp: new Date().toISOString(),
  });
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`✅ node-express-service running on port ${port}`);
});
