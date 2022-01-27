const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    try{
        mongoose.connection.close();
        console.log('Initializing MongoDB connection...');
    }
    catch(ex){
        console.error('Starting new MongoDB connection...', ex);
    }

    mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log(`Connected to ${config.get('path')}`));
}