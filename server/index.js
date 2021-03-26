const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 8080;
const PASSWORD = "password";
const DBNAME = "dbname";

// New server connection
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

// MONGO DB
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://xanderbakx:${PASSWORD}@cluster0.rqw8b.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
