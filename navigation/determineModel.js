const prompt = require('prompt-sync')();
const config = require('config');

//ADMIN/admin is meant to provide secret functionality like for 
//testing and development purposes like bulk data creation, not for 
//end user use, so it is not addressed in the initial console.logs.

const validChoices = ['P','R', 'Z', 'p', 'r', 'z','ADMIN','admin'];
let modelChoice = '';
let verification = '';

function DetermineModel(){
    console.log('\nTo access your greenhouse data, ' +
                'please enter one of the following commands:');
    console.log('P: Plant data');
    console.log('R: Reading data');
    console.log('Z: Zone data\n');

    ModelChoice();

    return modelChoice;
}

function ModelChoice(){
    modelChoice = prompt('Your choice: ');

    if(!validChoices.includes(modelChoice)) ModelChoice();
    
    modelChoice = modelChoice.toUpperCase();

    if(modelChoice != 'ADMIN') return modelChoice;

    verification = prompt.hide('Admin, please enter your password: ');

    if(verification == config.get('jwtPrivateKey')) return modelChoice;
}

module.exports.DetermineModel = DetermineModel;