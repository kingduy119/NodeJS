var express = require('express');
var router = express.Router();

// Redirect router
router.get('/', (req, res)=>{
    res.render('index', {
        title: "King Community"
    });
});

module.exports = router;