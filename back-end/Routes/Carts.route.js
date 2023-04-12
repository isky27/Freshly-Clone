const express = require("express");
const { find, findOne, findByIdAndUpdate } = require("../Models/Carts.module");
const Router = express.Router();
const Cart = require("../Models/Carts.module");
const Product = require("../Models/Products.module");

// add product to the cart url : (http://localhost:8080/carts/add)
Router.post("/add", async (req, res) => {
  try {
    let { token, productId } = req.body;
    if (!token || !productId) {
     return res.status(404).send({ error: "Sorry! You can't add Product" });
    }
    let getValue = token.split(":");
    let userId = getValue[0];

    let isCart = await Cart.findOne({ productId, userId });

    if (isCart) {
      let updateCount = await Cart.findByIdAndUpdate(
        isCart._id,
        { count: isCart.count + 1 },
        { new: true }
      );
      return res.status(200).send({msg : "update"});
    } else {
      let product = await Product.findOne({ _id: productId });

      if (product) {
        let carts = await Cart.create({ userId, productId, product });
        if (carts) {
         return res.status(200).send({msg : "Successfully Added into the cart"});
        }
      }
    }
  } catch (error) {
   return res.status(500).send({ msg: "Something Went Wrong!" });
  }
});

// add product to the cart url : (http://localhost:8080/carts/get)


// add product to the cart url : (http://localhost:8080/carts/delete)
Router.delete("/delete/:id", async (req, res) => {
  try {
    // let {token} = req.body;
    let id = req.params.id;
    // if(!token){
    //     res.status(404).send({error : "Sorry!"});
    // }
    // let getValue = token.split(":");
    // let userId = getValue[0];
    let isCheck = await Cart.findOneAndDelete(id);
    if (isCheck) {
     return res.status(200).send({msg : "Deleted Successfully!"});
    }
  } catch (error) {
   return res.status(500).send({ msg: "Something Went Wrong!", error });
  }
});

// add product to the cart url : (http://localhost:8080/carts/update/:id)
Router.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let isExists = await Cart.findOne({ _id: id });
    if (!isExists) {
     return res.status(404).send({ msg: "Sorry can't updated!" });
    }

    if (isExists.count > 1) {
      let update = await Cart.findByIdAndUpdate(
        id,
        { count: isExists.count - 1 },
        { new: true }
      );
     return res.status(200).send({ msg: "updated" });
    } else {
      let update = await Cart.findByIdAndDelete(id);
     return res.status(200).send({ msg: "Deleted" });
    }
  } catch (error) {
   return res.status(500).send({ msg: "Something Went Wrong!",error });
  }
});

// delete all cart items to the cart url : (http://localhost:8080/carts/userCartDelete)
Router.post("/userCartDelete", async (req, res) => {
  try {
    let { token } = req.body;
    if (!token) {
     return res.status(404).send({ msg: "Sorry! You have to Login first"});
    }
    let getValue = token.split(":");
    let userId = getValue[0];

    let userCartDelete = await Cart.deleteMany({ userId });
    if (userCartDelete) {
     return res.status(201).send({msg : "Delete Successfully"});
    }
  } catch (error) {
   return res.status(404).send({ msg: "Something Went Wrong!",  error });
  }
});

module.exports = Router;
