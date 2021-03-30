const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 8080;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
require("../secrets");
module.exports = app;

// MONGO DB
const DBNAME = "documents";
const uri = `mongodb+srv://xanderbakx:${process.env.PASSWORD}@documents.rqw8b.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// New socket connection
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);
  // When server socket receives "update-content" message, io broadcasts the content of that message to all clients
  socket.on("update-content", (content) => {
    console.log("updated");
    // Broadcast event
    io.emit("update-content", content);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/api", require("./api"));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.status) {
    console.error(err.stack);
  }
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    // Start listening only after DB is connected
    http.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
