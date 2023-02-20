const express = require('express');
const reviewRouter = express.Router();
const {reviewModel} = require('../Models/Review.model')

reviewRouter.post("/", async(req, res) =>{
    try {
        let {productId, userId, comment} = req.body;
        if(!productId || !userId || !comment){
            return res.status(404).send({msg : "Sorry! You Have to Login First"});
        }
        let [id_uaer, user] = userId.split(":");
        let reviewData = await reviewModel.create({comment, productId, userId : id_uaer});
        return res.send({msg : "Thank you for your Review!"})
    } catch (error) {
        return res.status(500).send({msg : "Somthing wen't Wrong"})
    }
});

reviewRouter.get("/:productId", async(req, res) =>{
    try {
        let productId = req.params.productId;
        let reviewData = await reviewModel.find({productId}).populate("userId");
        // first_name : reviewData.userId.first_name, last_name : reviewData.userId.last_name, comment : reviewData.comment
        return res.send(reviewData);
    } catch (error) {
        return res.status(500).send({msg : "Somthing wen't Wrong"})
    }
})


module.exports = {reviewRouter};