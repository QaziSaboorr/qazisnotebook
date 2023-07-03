const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1 : Get All notes using : Get "/api/notes/fetchallnotesr" .Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  // this end point is used to fetchall notes
  try {
    const notes = await Notes.find({ user: req.user.id }); //find notes by user id remember we added a foreign key in our notes table
    res.json(notes); //return all notes of that user
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
});

//Route 2 : Add a new note using fetch: Get "/api/notes/addnotes" .Login required
router.post(
  "/addnote", //addnote for that user
  fetchuser, //fetch user our middleware that takes token from header and validate it
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), //using express validator to let know server about input types
    body("description", "Description must be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array }); //error from client side as status code is 400
      }

      const note = await Notes.create({
        //always remember to use await with mongodb queries
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.send(note); // send notes as response
    } catch (error) {
      console.log(error);
      res.status(500).send("some error occured");
    }
  }
);

//Route 3 : update an  existing note using fetch: put "/api/notes/updatenote/:id" .Login required
router.put(
  //notice how we are using put request so that we can update notes instead of post request
  "/updatenote/:id", //addnote for that user
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    try {
      //find the note to be updated and delete
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }

      if (note.user != req.user.id) {
        return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.log(error);
      res.status(500).send("some error occured");
    }
  }
);

//Route 4 : delete an  existing note using fetch: delete "/api/notes/deletenote/:id" .Login required
router.delete(
  //notice how we use delete as its better
  "/deletenote/:id", //delete for that user , the id parameter has the id of that note
  fetchuser, //again this function uses token to validate user and

  async (req, res) => {
    //find the note to be delte it and delete
    try {
      let note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).send("Not found");
      }

      if (note.user != req.user.id) {
        //this is to check we are deleting the note of correct user and id of that user is attached to req , remember we attached the id in our middle ware function
        return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndDelete(req.params.id); //req.params.id "id" was one of the parameter in our request
      res.json("Note has been deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("some error occured"); //server error remember 500 is used for server error
    }
  }
);

module.exports = router; //export all routes
