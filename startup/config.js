const config = require('config');
const express = require('express');

const Choice = require('../navigation/determineDatabase');

module.exports = function(dbChoice, app){
    if(!config.get('jwtPrivateKey'))
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined!');

        const { port } = Choice(dbChoice);
    
        console.log(port);
    
    const server = app.listen(port, () => console.log(`Listening on port ${port}`));
    return server;
    }