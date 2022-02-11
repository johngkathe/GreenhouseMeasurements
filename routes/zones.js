const { Zone, validate } = require('../models/zone');
const { Plant } = require('../models/plant');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
    //throw new Error('Could not get the zones');
    const zones = await Zone.find().sort('name');
    res.send(zones);
});

router.post('/', /*auth,*/ async (req, res) => {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const plant = await Plant.findById(req.body.plant._id);
    if(!plant) return res.status(400).send('Invalid plant!');

    const zone = new Zone({ 
        name: req.body.name, 
        plant: {
            _id: plant._id,
            name: plant.name,
            species: plant.species,
            cultivar: plant.cultivar
        }, 
        plant_count: req.body.plant_count,
        distance_unit: req.body.distance_unit, 
        x_width: req.body.x_width,
        z_width: req.body.z_width,
        y_height: req.body.y_height
    });
    
    await zone.save();
    res.send(zone);
});

router.put('/:id', /*auth,*/ async (req, res) => {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const plant = await Plant.findByIdAndUpdate(req.params.id,
         {name: req.body.name}, {new: true});

    const zone = await Zone.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name, 
            plant: {
                _id: req.body.plant._id,
                name: req.body.plant.name,
                species: req.body.plant.species,
                cultivar: req.body.plant.cultivar
            }, 
            plant_count: req.body.plant_count,
            distance_unit: req.body.distance_unit, 
            x_width: req.body.x_width,
            z_width: req.body.z_width,
            y_height: req.body.y_height
        }, { new: true });

    if(!zone) return res.status(404)
        .send('The zone with the given ID was not found!');

    res.send(zone);
});

router.delete('/:id', /*[auth, admin],*/ async (req, res) => {
    const zone = await Zone.findByIdAndRemove(req.params.id);

    if(!zone) return res.status(404)
        .send('The zone with the given ID was not found!');

    res.send(zone);
});

router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID!');

    const zone = await Zone.findById(req.params.id);

    if(!zone) return res.status(404)
        .send('The zone with the given ID was not found!');

    res.send(zone);
});

module.exports = router;