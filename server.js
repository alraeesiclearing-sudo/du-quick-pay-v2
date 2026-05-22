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

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from root (for CSS, JS, images)
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

// Servlet routes
app.get('/servlet/myaccount/en/mya-quick-pay-payment.html', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Quick Pay</title>
    </head>
    <body>
      <input type="hidden" name="_authkey_" value="test_auth_key_12345">
      <script>
        console.log('Quick Pay Payment Page Loaded');
      </script>
    </body>
    </html>
  `);
});

// Serve ar/quick-pay.html for /ar/quick-pay
app.get('/ar/quick-pay', (req, res) => {
  res.sendFile(path.join(__dirname, 'ar/quick-pay.html'));
});

// Serve root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Catch all - serve ar/quick-pay.html for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ar/quick-pay.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
