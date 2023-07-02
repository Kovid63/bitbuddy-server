const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { databaseInit } = require('./middleware/databaseInit');
const { healthCheckHandler } = require('./handlers/healthCheckHandler');
const { signupHandler } = require('./handlers/signupHandler');
const { verifyTokenHandler } = require('./handlers/verifyTokenHandler');
const { loginHandler } = require('./handlers/loginHandler');

const PORT = 4000;
app.use(cors({credentials: true, origin: ['*', 'http://localhost:3000']}));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log('server running on port:', PORT);
})

databaseInit();

//get
app.get('/', healthCheckHandler);
app.get('/verify', verifyTokenHandler);


//post
app.post('/signup', signupHandler);
app.post('/login', loginHandler);