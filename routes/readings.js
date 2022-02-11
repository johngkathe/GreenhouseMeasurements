const { Reading, validate } = require('../models/reading');
const { Plant } = require('../models/plant');
const { Zone } = require('../models/zone');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    //throw new Error('Could not get the readings');
    const readings = await Reading.find().sort('time');
    res.send(readings);
});


router.post('/', /*auth,*/ async (req, res) => {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const zone = await Zone.findById(req.body.zone._id);
    if(! zone) return res.status(400).send('Invalid zone!');

    const reading = new Reading({
        time: Date.now(),
        zone: {
            _id: zone._id,
            name: zone.name, 
            plant: {
                _id: zone.plant._id,
                name: zone.plant.name,
                species: zone.plant.species,
                cultivar: zone.plant.cultivar
            }, 
            plant_count: zone.plant_count,
            distance_unit: zone.distance_unit, 
            x_width: zone.x_width,
            z_width: zone.z_width,
            y_height: zone.y_height
        },
        air_temp: req.body.air_temp,
        water_temp: req.body.water_temp,
        ec: req.body.ec,
        ph: req.body.ph,
        light_hours: req.body.light_hours,
        humidity: req.body.humidity
    });

    await reading.save();
    res.send(reading);
});

router.put('/:id', /*auth,*/ async (req, res) =>{
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const zone = await Zone.findByIdAndUpdate(req.params.id,
        {name: req.body.name}, {new: true});
       

    const reading = await Reading.findByIdAndUpdate(req.params.id,
        {
            zone: {
                _id: req.body.zone._id,
                name: req.body.zone.name, 
                plant: {
                    _id: req.body.zone.plant._id,
                    name: req.body.zone.plant.name,
                    species: req.body.zone.plant.species,
                    cultivar: req.body.zone.plant.cultivar
                }, 
                plant_count: req.body.zone.plant_count,
                distance_unit: req.body.zone.distance_unit, 
                x_width: req.body.zone.x_width,
                z_width: req.body.zone.z_width,
                y_height: req.body.zone.y_height
            },
            air_temp: req.body.air_temp,
            water_temp: req.body.water_temp,
            ec: req.body.ec,
            ph: req.body.ph,
            light_hours: req.body.light_hours,
            humidity: req.body.humidity
        }, { new: true });    

    if(!reading) return res.status(404)
        .send('The reading with the given ID was not found!');

    res.send(reading);
});

router.delete('/:id', /*[auth, admin],*/ async (req, res) => {
    const reading = await Reading.findByIdAndRemove(req.params.id);

    if(!reading) return res.status(404)
        .send('The reading with the given ID was not found!');

    res.send(reading);
});

router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID!');
    
    const reading = await Reading.findById(req.params.id);

    if(!reading) return res.status(404)
        .send('The reading with the given ID was not found!');

    res.send(reading);
});

module.exports = router;