//This helper function works on the notion that the dbChoice is either L
//or R (the else).

const config = require('config');

module.exports = function(dbChoice) {
    let database, databasePath, databasePort;

    if(dbChoice == 'L'){
        database = config.get('localDB');
        databasePath = config.get('localPath');
        databasePort = config.get('localPort') || process.env.PORT;
    }
    else{
        database = config.get('remoteDB');
        databasePath = config.get('remotePath');
        databasePort = config.get('remotePort') || process.env.PORT;
    }
    const dbDetails = {
        db: database,
        dbPath: databasePath,
        port: databasePort
    };

    return dbDetails;
}