const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createDeal, updateDeal, endDeal, claimDeal } = require('./services/dealService');
const {faker} = require('@faker-js/faker');


const app = express();
app.use(bodyParser.json());

let Deal;

let URL = `https://localhost:3000`

async function connectMemoryDB(){
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {useNewUrlParser: true,useUnifiedTopology: true});

    const dealSchema = new mongoose.Schema({
        price: Number,
        itemsAvailable: Number,
        itemsSold: {type: Number, default: 0},
        isActive: {type: Boolean, default: true}
    });
    Deal = mongoose.models.Deal || mongoose.model('Deal', dealSchema);
}
connectMemoryDB()


//create a random deal
app.post('/deal/random', async (req, res) =>{
    try {
        const randomPrice = faker.commerce.price(10, 100);
        const randomItemsAvailable = faker.number.int({min: 10, max: 100});
        const newDeal = await createDeal(randomPrice, randomItemsAvailable);
        res.status(200).send(newDeal);
    } catch (error) {
        res.status(500).send('Server Error:' + error.message)
    }
})



//cerate a new deal
app.post(`${URL}/deal`, async (req, res) => {
    const { price, itemsAvailable } = req.body;

    try {
        const newDeal = await createDeal(price, itemsAvailable);
        res.status(200).send(newDeal);
    } catch (error) {
        res.status(500).send('Server Error:' + error.message)
    }
})

//end a deal
app.patch(`${URL}/deal/:id/end`, async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const deal = await endDeal(id);
        res.status(200).send(deal);
    } catch (error) {
        res.status(500).send('Server Error:' + error.message)
    }
})

//update a deal
app.patch(`${URL}/deal/:id`, async (req, res) => {
    const { id } = req.params;
    const { price, itemsAvailable } = req.body;
    console.log(id);

    try {
        const updateDeal = await updateDeal(id, price, itemsAvailable);
        res.status(200).send(updateDeal);
    } catch (error) {
        res.status(500).send('Server Error:' + error.message)
    }
});

//claim a deal
app.patch(`${URL}/deal/:id/claim`, async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const deal = await claimDeal(id);
        res.status(200).send(deal);
    } catch (error) {
        res.status(500).send('Server Error:' + error.message)
    }

})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})