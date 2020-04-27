var express = require('express');
var router = express.Router();

const Item = require('../model/shoppingItem');

// retreiving data from database
router.get('/get_items', (req, res, next)=>{
    Item.find(function(err, items){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(items);
        }
    })
});

// inserting new data
router.post('/post_items', (req, res, next)=>{
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });
    newShoppingItem.save((err, item)=>{
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json({msg: 'Item has been added successfully!'});
        }
    });
});

// updating data
router.put('/update_items/:id', (req, res, next)=>{
    Item.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    },
    function(err, result){
        if(err)
        {
            res.json(err);
            // res.json({msg: 'error found!'});
        }
        else
        {
            // res.json(result);
            // console.log('update working properly');
            res.json({msg: 'Item has been updated successfully!'});
        }
    });
});

// delete data
router.delete('/delete_items/:id', (req, res, next)=>{
    Item.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
            // res.json({msg: 'Item has been deleted successfully!'});
        }
    });
});


module.exports = router;

