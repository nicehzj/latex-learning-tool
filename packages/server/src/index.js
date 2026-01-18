const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { compileTeX } = require('./compiler');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (PDFs) from the 'temp' directory
app.use('/static', express.static(path.join(__dirname, '..', 'temp')));

// --- PROD: Serve Frontend Static Files ---
// Point to packages/client/dist
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// Compile endpoint
app.post('/api/compile', async (req, res) => {
  const { source, jobName } = req.body;
  
  if (!source || !jobName) {
    return res.status(400).json({ 
      success: false, 
      errorMsg: 'Missing source or jobName in request body.' 
    });
  }

  console.log(`[Compile] Job: ${jobName}, Length: ${source.length}`);

  try {
    const result = await compileTeX(source, jobName);
    res.json(result);
  } catch (error) {
    console.error('Unexpected server error during compilation:', error);
    res.status(500).json({ 
      success: false, 
      errorMsg: 'Internal server error.' 
    });
  }
});

// --- PROD: Catch-all handler for React Router ---
// For any request that doesn't match API or Static, return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});