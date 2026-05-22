const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/du/common/myaccount/backend-routine/json/landingPageData.json', (req, res) => {
  const dataPath = path.join(__dirname, 'du/common/myaccount/backend-routine/json/landingPageData.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading landingPageData:', err);
      return res.json({ error: true, message: 'Data not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('/du/common/myaccount/backend-routine/error.json', (req, res) => {
  const errorPath = path.join(__dirname, 'du/common/myaccount/backend-routine/error.json');
  fs.readFile(errorPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading error.json:', err);
      return res.json({ error: true });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Serve ar/quick-pay.html for /ar/quick-pay
app.get('/ar/quick-pay', (req, res) => {
  res.sendFile(path.join(__dirname, 'ar/quick-pay.html'));
});

// Serve webapp/ar/quick-pay for original path
app.get('/webapp/ar/quick-pay', (req, res) => {
  res.sendFile(path.join(__dirname, 'ar/quick-pay.html'));
});

// Serve root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch all - serve ar/quick-pay.html for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ar/quick-pay.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
