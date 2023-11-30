const express = require("express");

const path = require("path");
const PORT = 3001;

const app = express();


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));




// html routes:

// GET route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// cannot be at top of code or stops GET routes - Universal route to error page
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/404.html"));
});




app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});