const express = require('express');
const app = express();

const dbChoice = require('./startup/dbChoice')()
require('./startup/routes')(app);
const greenlight = require('./startup/db')(dbChoice, app);
require('./startup/fawn')(dbChoice);
const server = require('./startup/config')(dbChoice, app);
require('./startup/validation')();

require('./operations/modelExplorer')(greenlight);