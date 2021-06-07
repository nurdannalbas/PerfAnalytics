const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const port = 3004

var timingData;

app.use(express.json());
app.get('/get-timing-data', (req, res) => {
    res.json(timingData);
});

app.post('/send-timing-data', function (req, res) {
    timingData = req.body.timingData;
    res.json(timingData);
});

app.listen(port, () => {
    console.log('server is listening on port 3004');
});