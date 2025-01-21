// routes/docRoutes.js
const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');

// Zeigt alle Dokumente + Suche
router.get('/', docController.getDocuments);

// Hochladen (ggf. Middleware für Datei-Upload, hier nur dummy)
router.post('/upload', docController.uploadDocument);

module.exports = router;
