const mongoose = require("mongoose"); //using mongoose module which we installed when we used npm innit "reffer to harry video of you forget"
const mongoURI = "mongodb://localhost:27017/inotebook"; //we got this link from our mongodb compass "/inotebook" represents database
mongoose.set("strictQuery", true); // this was just to avoid warning
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to moongo hogaya succesfully");
  });
};

module.exports = connectToMongo; //exporting the function so it can be used in other files
