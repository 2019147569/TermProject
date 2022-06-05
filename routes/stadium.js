const express = require('express');
const router = express.Router();
const fs = require('fs');

const appkey = '873146e7a0afc870594980aeeae20abf';

router.route('/:stadium_id')
    .get((req, res) => {
        let stadiumID = parseInt(req.params.stadium_id);
        let seat = parseInt(req.query.seat);

        let sport = req.query.sport;
        console.log(sport);
        
        // baseball.json -> xcor, ycor
        let fileName;
        if (sport === 'baseball') { fileName = 'baseball.json'}
        else if(sport === 'football') {fileName = 'football.json'}
        fs.readFile('./public/' + fileName, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                var list = JSON.parse(data);
                coor = list[stadiumID - 1].Sits_kakao[seat].coordinate;
                console.log(coor);
                
                let stadiumName = list[stadiumID -1].name;
                let seatName = list[stadiumID - 1].Sits_kakao[seat].name;
                let imageCount = coor.length;

                res.render('stadium', {
                    coordinate: coor, 
                    stadiumName: stadiumName, 
                    seatName: seatName,
                    imageCount: imageCount,
                    appkey: appkey
                });
            }
        });


        // render stadium.ejs, params: stadiumName, xcor, ycor
        

    });


module.exports = router;