//require is basically an alternative for import in javascript

const express = require("express"); //importing express
const router = express.Router(); //using express router
const User = require("../models/User"); //getting the schema back or importing it
const { body, validationResult } = require("express-validator"); //this is to check our data, imports body and function
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
// Route1 : Create a user using: POST "/api/auth/". Doesnt require Auth
let jwtSecret = "QaziIsAGoodBoy"; //sign for token created by jwt so that if anyone tempers with data we know
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
    let success = false;
    if (!errors.isEmpty()) {
      //error handling of input

      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //check whether the user with same email exists already
      let duplicateEmail = await User.findOne({ email: req.body.email }); //mongodb query on User 'model' or 'table' which we recently imported

      if (duplicateEmail) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a user with this email already exists",
          }); //error handling
      }
      const salt = await bcrypt.genSalt(10); //salt to make our password extra secure

      secPass = await bcrypt.hash(req.body.password, salt); //hash to create a hash for password along with salt added

      let user = await User.create({
        //creates user in User table
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret); //token needs a unique data so we are sending the id of each user to be unique
      //first argumen is always an object which contains an object
      success = true;
      res.json({ success, authtoken }); //{authtoken:authtoken}
    } catch (error) {
      //error handling
      console.log(error);
      res.status(500).send("some error occured");
    }
  }
);

//Route2: Authenticate a user using :Post "api/auth/login". no Login required

router.post(
  "/login",
  [
    body("email", "Enter a valid name").isEmail(), //using express validator to let server about input types
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    const errors = validationResult(req); //now that validator is trainer we pass in client request
    if (!errors.isEmpty()) {
      //error handling of input
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //gettig user from database cause emails are unique in our case
      if (!user) {
        //if couldnt find user
        const success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //compares password with hash
      if (!passwordCompare) {
        const success = false;
        //if couldnt find password
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        //this again like above to generate a token
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret); //token needs a unique data so we are sending the id of each user which is unique
      //first argumen is always an object which contains an object
      const success = true;
      //each time user signs in we get a new token which we can decode in our getuser function
      res.json({ success, authtoken });
    } catch (error) {
      //catch error
      console.log(error);
      res.status(500).send("internal server error occured ");
    }
  }
);

//Route3: Get loggin  User  details  using :Post "api/auth/getuser".  Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id; //this user Id is retrieved using token ,the toke was appended to header of request using middleware function "fetchuser"
    const user = await User.findById(userId).select("-password"); //give me everything except the password
    res.send(user); //send in the user info as respone
  } catch (error) {}
});
module.exports = router; //exporting the router

//note 400 -> clients fault
//note 500 -> something happened in backend or server
