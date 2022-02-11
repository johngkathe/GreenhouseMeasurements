const express = require('express');
const plants = require('../routes/plants');
const zones = require('../routes/zones');
const readings = require('../routes/readings');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/plants', plants);
    app.use('/api/zones', zones);
    app.use('/api/readings', readings);
}