const { Plant, validate } = require('../models/plant');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
    //throw new Error('Could not get the plants');
    const plants = await Plant.find().sort('name');
    res.send(plants);
});

router.post('/', /*auth,*/ async (req, res) => {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const plant = new Plant({ 
        name: req.body.name, 
        species: req.body.species, 
        cultivar: req.body.cultivar
    });
    
    await plant.save();
    res.send(plant);
});

router.put('/:id', /*auth,*/ async (req, res) => {
    const { error } = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    const plant = await Plant.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name, 
            species: req.body.species, 
            cultivar: req.body.cultivar
        }, { new: true });

    if(!plant) return res.status(404)
        .send('The plant with the given ID was not found!');

    res.send(plant);
});

router.delete('/:id', /*[auth, admin],*/ async (req, res) => {
    const plant = await Plant.findByIdAndRemove(req.params.id);

    if(!plant) return res.status(404)
        .send('The plant with the given ID was not found!');

    res.send(plant);
});

router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID!');

    const plant = await Plant.findById(req.params.id);

    if(!plant) return res.status(404)
        .send('The plant with the given ID was not found!');

    res.send(plant);
});

module.exports = router;