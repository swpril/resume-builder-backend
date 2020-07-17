const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');

const app = express();
const pdfTemplate = require('./documents')
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('Resume.pdf', (err) => {
        if (err)
            res.send(Promise.reject());
        res.send(Promise.resolve());
    })
});

app.get('/fetch', (req, res) => {
    res.sendFile(`${__dirname}/Resume.pdf`)
});

app.listen(port, () => { console.log(`Server is up on PORT ${port}`) });