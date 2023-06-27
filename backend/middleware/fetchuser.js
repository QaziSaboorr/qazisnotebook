let jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  //our middleware function
  let jwtSecret = "QaziIsAGoodBoy";
  //Get the user from jwt token and add id to req object
  const token = req.header("auth-token"); //token  retrieved from header of request
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" }); //401 status code is bascially error with authentication
  }

  try {
    const data = jwt.verify(token, jwtSecret); //this matches the token with our sign in
    req.user = data.user; //appending user info to request which we retrieve in next function

    next(); //run the next function
  } catch {
    res.status(401).send({ error: "please authenticate using a valid token" }); //401 is basically an authentication error
  }
};

module.exports = fetchuser;
