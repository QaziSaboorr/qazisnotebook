//require is basically an alternative for import in javascript

const express = require("express"); //importing express
const router = express.Router(); //using express router
const User = require("../models/User"); //getting the schema back or importing it
const { body, validationResult } = require("express-validator"); //this is to check our data, imports body and function

// Create a user using: POST "/api/auth/". Doesnt require Auth
router.post(
  "/createuser", // creates a route that will be used in our index.js
  [
    body("email", "Enter a valid name").isEmail(), //using express validator to let server about input types
    body("name", "Enter a valid email").isLength({ min: 3 }),
    body("password", "Password must be minimum of length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req); //now that validator is trainer we pass in client request
    if (!errors.isEmpty()) {
      //error handling of input
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether the user with same email exists already
      let duplicateEmail = await User.findOne({ email: req.body.email }); //mongodb query on User 'model' or 'table' which we recently imported

      if (duplicateEmail) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" }); //error handling
      } else {
        let user = await User.create({
          //creates user in User table
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        res.json(user);
      }
    } catch (error) {
      //error handling
      console.log(error);
      res.status(500).send("some error occured");
    }

    // .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({ error: "Please enter a new email", message: err });
    // });
  }
);

module.exports = router; //exporting the router

//note 400 -> clients fault
//note 500 -> something happened in backend or server
