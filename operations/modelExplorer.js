const { DetermineModel } = require('../navigation/determineModel');
const { DetermineCRUD } = require('../navigation/determineCRUD');
const Wait = require('../bootWait');

module.exports = async function(greenlight){
    await greenlight;

    let model = DetermineModel();
    let crud = DetermineCRUD();
}

