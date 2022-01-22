const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
// anytime we call uuid, we will get a universally unique identifier

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: uuid(),
    username: "Chad",
    comment: "not that funny",
  },
  {
    id: uuid(),
    username: "Tina",
    comment: "you guys are gross",
  },
  {
    id: uuid(),
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
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
  // need to create a new unique id as new comments are created...using npm i uuid...

  //   console.log(req.body);
  //   res.send("It Worked!");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  //   the id from req.params will be a STRING!
  //   the below statement will parse out the id into a number...but with uuid, no need to parseInt
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

// app.patch is in the express docs under app.METHOD
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  //   the payload only includes the new comment text
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  //   this actually will mutate the array, but that's not really a best practice in web dev
  foundComment.comment = newCommentText;
  res.redirect("/comments");
  //   const comment = comments.find((c) => c.id === id);
  //   res.send("patch success");
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
