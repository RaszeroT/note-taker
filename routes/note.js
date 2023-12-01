const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// defines end point as /api/notes then retrieves notes from db.json
router.get("/api/notes", async (req, res) => {
  try {
    const db = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(db);
  } catch (err) {
    console.log("error");
  }
});

// defines end point as /api/notes then posts new note dynamically to db.json
router.post("/api/notes", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  db.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  res.json(db);
});

// delete
router.delete("/api/notes/:id", (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON = JSON.parse(data);
  const newNote = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(newNote));
  res.json("Note deleted.");
});

module.exports = router;
