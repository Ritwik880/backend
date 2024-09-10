const Deal = require('../models/deal');

//service to create a new deal
async function createDeal(price, itemsAvailable){
    if(!price || !itemsAvailable){
        throw new Error('Price and itemsAvailable are required');
    }
    const newDeal = new Deal({price, itemsAvailable, isActive: true});
    return await newDeal.save();
}

//service to update a deal
async function updateDeal(id, price,itemsAvailable){
    const deal = await Deal.findById(id);

    if(!deal){
        throw new Error('Deal not found!');
    }

    if(price) deal.price = price;

    if(itemsAvailable) deal.itemsAvailable = itemsAvailable;

    return await deal.save();
}

//servcie to end a deal
async function endDeal(id){

    const deal = await Deal.findById(id);

    if(!deal){
        throw new Error('Deal not found');
    }
    if(!deal.isActive){
        throw new Error('Deal is already ended');
    }

    deal.isActive = false;
    return await deal.save();
}

//servcie to claim a deal
async function claimDeal(id){

    const deal = await Deal.findById(id);

    if(!deal){
        throw new Error('Deal not found');
    }
    if(!deal.isActive || !deal.itemsAvailable <=0){
        throw new Error('Deal is not active or it is not active');
    }

    deal.itemsAvailable -= 1;
    deal.itemSold += 1;

    return await deal.save();
}

module.exports = {
    createDeal,
    updateDeal,
    endDeal,
    claimDeal
}