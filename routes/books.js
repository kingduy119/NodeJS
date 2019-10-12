const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.book_index);

router.get('/find/:bookId', bookController.book_find_id);

router.delete('/delete/:bookId', bookController.book_delete_id);

router.post('/newbook', bookController.book_add_new);

router.post('/updatebook', bookController.book_update_by_id);

module.exports = router;