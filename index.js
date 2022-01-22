const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    username: "Chad",
    comment: "not that funny",
  },
  {
    username: "Tina",
    comment: "you guys are gross",
  },
  {
    username: "Brad",
    comment: "lol!!!",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment });
  //   console.log(req.body);
  res.send("It Worked!");
});

// // *** old practice
// app.get("/tacos", (req, res) => {
//   res.send("GET /tacos response");
// });

// app.post("/tacos", (req, res) => {
//   const { meat, qty } = req.body;
//   res.send(`OK, here are your ${qty} ${meat} tacos`);
// });

// ** must have this to have the server 'turned on'!!!
app.listen(3000, () => {
  console.log("ON PORT 3000!");
});

// ******** plan for this app:
// trying to CRUD a comment
// username
// Text

// bob - hello!

// could possibly use:
// GET /allcomments
// GET /allcomments
// GET /showmeallcommentsnow

// POST /newcomment
// POST /makecomment

// We will stick w/ same base URL...this will be our pattern to follow:
//
// GET /comments - list all comments
// GET /comments/new - Form to create a new comment
// POST /comments - Create a new comment on server
// GET /comments/:id - Get one specific comment (using ID)
// GET /comments/:id/edit - Form to edit specific comment
// PATCH  /comments/:id - Update one specific comment on server
// DELETE /comments/:id - Destroy one specific comment on server
