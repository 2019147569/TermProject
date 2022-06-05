const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        
    })

router.route('/:stadium_name')
    .get((req, res) => {
        let stadiumName = req.params.stadium_name;
        // render stadium.ejs, params: stadiumName, lat, lng
        
        res.render('stadium', { stadiumName: stadiumName });
    })


module.exports = router;