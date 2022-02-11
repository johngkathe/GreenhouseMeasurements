const Joi = require('joi');
const mongoose = require('mongoose');
const { zoneSchema } = require('./zone');

const Reading = mongoose.model('Reading', new mongoose.Schema({
    zone: {
        type: zoneSchema,
        required: true
    },
    time: {
        type: Date,
        default: Date.now(),
        required: false
    },
    air_temp: {
        type: Number,
        required: true
    },
    water_temp: {
        type: Number,
        required: true
    },
    ec: {
        type: Number,
        required: true,
        min: 0,
        max: 10   //10 milliSiemens/cm
    },
    ph: {
        type: Number,
        required: true,
        min: 0,
        max: 14
    },
    light_hours: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },
    humidity: {
        type: Number,
        required: true,
        minLength: 0,   //0%
        maxLength: 100    //100%
    }
}));

function validateReading(reading){
    const schema = Joi.object().keys({
        time: Joi.date().timestamp('unix'),
        zoneId: Joi.objectId().required(),
        air_temp: Joi.number().required(),
        water_temp: Joi.number().required(),
        ec: Joi.number().min(0).max(10).required(),
        ph: Joi.number().min(0).max(14).required(),
        light_hours: Joi.number().min(0).max(24).required(),
        humidity: Joi.number().min(0).max(100).required()
    })

    const { time,  zone, air_temp, water_temp, ec, 
            ph, light_hours, humidity } = reading;
    const { _id: zoneId } = zone;

    return schema.validate({ time, zoneId, air_temp, 
           water_temp, ec, ph, light_hours, humidity });
}

module.exports.Reading = Reading;
module.exports.validate = validateReading;