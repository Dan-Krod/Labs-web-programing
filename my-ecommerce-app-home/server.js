const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRouter = require('./route'); 
const db = require('./database'); 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'public')));

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
