const express = require("express");
const Admin = require("../Models/admin.model");
const router = express.Router();

// Admin signup
router.post("/signup", async (req, res) => {
  const { email, password, first_name, last_name, role, avtar } = req.body;
  try {
    let existingUser = await Admin.findOne({ email });
    if (existingUser) {
     return res.status(404).send({msg :"Connot create an user with exist"});
    } else {
      let admin = await Admin.create({
        email,
        password,
        first_name,
        last_name,
        role,
        avtar,
      });
      if (admin) {
       return res.send({msg : "Sign-Up Successfully!"});
      }
    }
  } catch (error) {
    return res.status(500).send({msg : e.massege});
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      if (password === admin.password) {
       return res.status(200).send({
          token: `${admin._id}:${admin.role}`,
          admin,
        });
      } else {
        return res.status(404).send({msg : "you are not admin,incorrect password"});
      }
    } else {
     return res.status(404).send({msg : `Admin this ${email} id note found`});
    }
  } catch (error) {
   return res.status(500).send({msg : error.massege});
  }
});
module.exports = router;
