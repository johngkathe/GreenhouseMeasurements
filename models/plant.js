const Joi = require('joi');
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    species: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    cultivar: {
        type: String,
        required: false,
        minLength: 3,   //N/A is shortest viable option
        maxLength: 50
    }
});

const Plant = mongoose.model('Plant', plantSchema);

function validatePlant(plant){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        species: Joi.string().min(5).max(50).required(),
        cultivar: Joi.string().min(3).max(50)
    })

    const { name, species, cultivar } = plant;

    return schema.validate({ name, species, cultivar });
}

module.exports.plantSchema = plantSchema;
module.exports.Plant = Plant;
module.exports.validate = validatePlant;