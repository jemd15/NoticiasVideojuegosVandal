const express = require('express');
const router = express.Router();
const newsModel = require('../models/news.model');

router.get('/', /* verifyRole.admin, */ (req, res) => {
  newsModel.getNews()
    .then(news => {
      res.status(200).json(news);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

module.exports = router;