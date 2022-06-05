const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .get((req, res) => {
        
    })

router.route('/:stadium_id')
    .get((req, res) => {
        let stadiumID = parseInt(req.params.stadium_id);
        let seat = parseInt(req.query.seat);

        console.log(stadiumID, seat);

        // baseball.json -> xcor, ycor
        fs.readFile('./public/baseball.json', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                var list = JSON.parse(data);
                coor = list[stadiumID - 1].Sits_kakao[seat].coordinate;
                console.log(coor);
                // xcor = 37.00000;
                // ycor = 127.00000;
                res.render('stadium', { coordinate: coor });
            }
        });


        // render stadium.ejs, params: stadiumName, xcor, ycor
        

    });


module.exports = router;