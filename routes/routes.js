const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers');

router.post('/addSong', [
    body('title').notEmpty().withMessage("Song Title can not be empty"),
    body('picture').notEmpty().withMessage("Song Picture can not be empty"),
    body('origin_year').notEmpty().withMessage("Song Origin Year can not be empty"),
    body('creator').notEmpty().withMessage("Song Creator can not be empty"),
    body('genre').notEmpty().withMessage("Song genre can not be empty"),

], controller.addSong);

router.post('/getSong', [
    body('cat').notEmpty().withMessage("Category can not be empty"),
    body('param').notEmpty().withMessage("Parameter can not be empty")
], controller.getSongOnly);
module.exports = router;