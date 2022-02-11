const prompt = require('prompt-sync')();

const validChoices = ['L', 'R', 'l', 'r'];
let dbChoice = '';

module.exports = function() {
    console.log('You can establish a MongoDBconnection with either a localhost or a remote database.\n');
    
    VerifyChoice();
    
    return dbChoice = dbChoice.toUpperCase();
}

function VerifyChoice(){
    dbChoice = prompt('Please enter \'L\' for localhost and \'R\' for remote Database: ');

    dbChoice.toUpperCase();

    if(validChoices.includes(dbChoice))  return dbChoice;
    else VerifyChoice();
}