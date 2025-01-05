const express = require('express');
const path = require('path');
require('dotenv').config();  // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Serve the dist folder (React build)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing (React SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
