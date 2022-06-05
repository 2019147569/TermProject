const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
})

const stadiumRouter = require('./routes/stadium');
app.use('/stadium', stadiumRouter);

app.listen(3000, () => {
    console.log('Running server on localhost:3000');
});