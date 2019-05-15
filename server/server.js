const express = require('express')
const db = require('./models/db')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;

// Sync database
db.sync().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`)); 
}).catch((err) => {
    console.log("Error occur when server start: " + err)
});

// Client and Server on 2 machine, 2 port,...
// This CORS allows get request from any address
app.use(cors());
app.options('*', cors());

// Routes as API
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));


