// Import necessary modules
const express = require('express');
const path = require('path'); // Helps work with file paths

// Create an Express application
const app = express();

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000; // You can use any available port

// --- MIDDLEWARE ---
// Serve static files (CSS, images, client-side JS)
// Tell Express to serve files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---
// Route for the Home page ('/')
app.get('/', (req, res) => {
  // Send the index.html file as the response
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for the About page ('/about')
app.get('/about', (req, res) => {
  // Send the about.html file as the response
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
// Route for the Resume page ('/resume')
app.get('/resume', (req, res) => {
    // Send the resume.html file as the response
    res.sendFile(path.join(__dirname, 'views', 'resume.html'));
});
// Route for the Contact page ('/contact')
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
// --- START THE SERVER ---
// Route for the Contact page ('/contact')
app.get('/certificate', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'certificate.html'));
});
// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
});
