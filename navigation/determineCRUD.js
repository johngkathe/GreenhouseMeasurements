const prompt = require('prompt-sync')();

const validChoices = ['C','D','R','U','c','d','r','u'];
let crudChoice = '';

function DetermineCRUD(){
    console.log('\nTo interact with your greenhouse data, ' +
                'please enter one of the following commands:');
    console.log('C: CREATE/POST data');
    console.log('R: READ/GET data');
    console.log('U: UPDATE/PUT data');
    console.log('D: DELETE data');

    CRUDChoice();

    return crudChoice;
}

function CRUDChoice(){
    crudChoice = prompt('Your choice: ');

    if(!validChoices.includes(crudChoice)) CRUDChoice();

    return crudChoice = crudChoice.toUpperCase();
}

module.exports.DetermineCRUD = DetermineCRUD;