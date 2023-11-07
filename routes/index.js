const express = require('express');

// Import our files containing our routes
const notesPath = require('./notes');

// Create and instance of express so we can apply the middleware and routing
const app = express();

app.use('/notes', notesPath);

module.exports = app;