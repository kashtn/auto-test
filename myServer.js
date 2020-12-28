const express = require("express");
const mysql = require("mysql2");
const mongoose = require("mongoose");
const Request = require("./models/Request.js");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 666

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  mongoose.connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://ivan_musk:whitesector1488@exchange-rates.byyid.mongodb.net/DaData_base?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  app.all("*", (req, res) => {
    return handle(req, res)
  })
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });

  // const db = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "whitesector1488",
  //   database: "books",
  // });

  // db.connect((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Connected...");
  //   }
  // });

  

  // app.get("/mysql", (req, res) => {
  //   console.log("mysql");
  //   res.json("answer");
  // });

  // app.get("/create", (req, res) => {
  //   let sql = "CREATE DATABASE db1";
  //   db.query(sql, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       res.send("Created...");
  //     }
  //   });
  // });

  app.post("/saveRequest", (req, res) => {
    console.log("myServer>>>", req.body);
    res.json("123");
  });
});
