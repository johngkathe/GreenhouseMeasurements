const Joi = require('joi');
const mongoose = require('mongoose');
const { plantSchema } = require('./plant');

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    plant: {
        type: plantSchema,
        required: true
    },
    plant_count: {
        type: Number,
        min: 1,
        required: true
    },
    distance_unit: {    //Boolean 1 for Imperial, 0 for SI
        type: Boolean,
        required: true
    },
    x_width: {
        type: Number,
        required: true
    },
    z_width: {
        type: Number,
        required: true,
    },
    y_height: {
        type: Number,
        required: false
    }
});

const Zone = mongoose.model('Zone', zoneSchema);

function validateZone(zone){

    const schema = Joi.object().keys({
        name: Joi.string().min(1).max(50).required(),
        plantId: Joi.objectId().required(),
        plant_count: Joi.number().min(1).required(),
        distance_unit: Joi.boolean().required(),
        x_width: Joi.number().required(),
        z_width: Joi.number().required(),
        y_height: Joi.number()
    })
    
    const { name, plant, plant_count, distance_unit,
            x_width, z_width, y_height } = zone;

    const { _id: plantId } = plant;

        return schema.validate({ name, plantId, plant_count, distance_unit,
                                      x_width, z_width, y_height });
}

module.exports.zoneSchema = zoneSchema;
module.exports.Zone = Zone;
module.exports.validate = validateZone;