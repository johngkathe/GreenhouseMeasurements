const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Choice = require('../navigation/determineDatabase');

module.exports = function(dbChoice, app){
    try{
        mongoose.connection.close();
        console.log('\nInitializing MongoDB connection...');
    }
    catch(ex){
        console.error('Starting new MongoDB connection...', ex);
    }
    
    const { db, dbPath } = Choice(dbChoice);

    let greenlight = mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log(`Connected to ${dbPath}`))

    return greenlight;
}