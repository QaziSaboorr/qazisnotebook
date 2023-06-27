// mongodb://localhost:27017
const express = require("express");
const connectToMongo = require("./db");
connectToMongo(); //running the imported function from /db

const app = express(); //app is using express server
const port = 8000; //server running on port 8000

app.use(express.json()); //middleware to use json as data exchange between client(frontend) and server(backend)

app.get("/", (req, res) => {
  res.send("Hello World!"); //res == what you send from back end to server
});
//Available routes
app.use("/api/auth", require("./routes/auth")); //importing the route from the path specified in "require" function
app.use("/api/notes", require("./routes/notes")); //imorting the route again from s

app.listen(port, () => {
  console.log(`Inotebook backend listening on http://localhost:${port}`);
});

// http://localhost:3000
