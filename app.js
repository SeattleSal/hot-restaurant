// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// table is up to 5 reservations
var tables = [
    {
        customerName: "James Bond",
        phoneNumber: "007",
        customerEmail: "licensetokill@hotmail.com",
        customerID: "007"
    }
];
var waitlist = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
  app.get("/api/tables", function(req, res) {
      return res.json(tables);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
    });

  // routes for html pages: index
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.post("/api/tables", function(req, res) {
      var newCustomer = req.body;

      if (tables.length < 6){
          tables.push(newCustomer);
          // res.json(newCustomer);
          // return true?
      } else {
          waitlist.push(newCustomer);
          // res.json(newCustomer);
          // return false?
      }

    //   console.log(newCustomer);
  });

  app.post("/api/clear", function(req, res) {
    // Clear out the table and wait lists (No POST data required) and THEN 
    tables = [];
    waitlist = [];
    console.log(tables);
    console.log(waitlist);
    console.log("customers cleared");
    var successMessage = [{
        success: true
    }];
    res.send(successMessage);
  });

  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });