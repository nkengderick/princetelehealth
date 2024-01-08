// routes/record.js
const express = require('express');
const recordController = require('../controllers/recordcontroller');

const router = express.Router();

router.post('/create', recordController.createRecord);

router.get('/all', recordController.getAllRecords);

module.exports = router;
