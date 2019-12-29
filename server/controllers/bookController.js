const Book = require('../models/book');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

// Upload file:
// ===========================================================================
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file , cb) => {
    if(file.minetype === 'image/jpeg' || file.minetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, limit: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// ===========================================================================

exports.book_index = (req, res, next) => {
    Book.find()
        .select('title author price')
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Erorr!'
            })
        });
};

exports.book_find_id = (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .select('_id title author price bookImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc) {
                res.status(200).json({
                    _id: doc._id,
                    title: doc.title,
                    author: doc.author,
                    price: doc.price,
                    path: doc.bookImage
                })
            } else {
                res.status(200)
                    .json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500)
                    .json({error: err});
        });
};

exports.book_delete_id = (req, res, next) => {
    const id = req.params.bookId;
    Book.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:1000/delete/' + id,
                    data: {title: 'String', author: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.book_add_new = upload.single('bookImage'), (req, res, next) => {
    const item = new Book({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    });
    item.save()
        .then(result => {
            console.log('Successfully saved!');
            res.status(200).json({
                _id: result._id,
                title: result.title,
                author: result.author,
                price: result.price,
                bookImage: result.bookImage
            });
        })
        .catch(err => {
            console.log('Save fail!');
        });
};

exports.book_update_by_id = (req, res, next) => {
    const id = '5d99a54c1c9d440000424ff2';
    Book.updateOne({_id: id}, {title: 'new title'})
        .exec()
        .then(result => {
            console.log('UPDATED!');
            res.status(200).json({
                message: 'Successfully update'
            });
        })
        .catch(err => {
            console.log('Update fail!');
            res.status(404).json({
                message: 'Update fail'
            });
        });
};