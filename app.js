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
    },
    {
      customerName: "Dolly Parton",
      phoneNumber: "999 999 5555",
      customerEmail: "jolene@hotmail.com",
      customerID: "9to5"
    },
    {
      customerName: "Kenny Rogers",
      phoneNumber: "999 555 5555",
      customerEmail: "thegambler@hotmail.com",
      customerID: "gabler777"
    }
];
var waitlist = [
  {
    customerName: "Elmer Fudd",
    phoneNumber: "111 111 1111",
    customerEmail: "wabbit@hotmail.com",
    customerID: "wabbit111"
  }
];

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

      if (tables.length < 5){
          tables.push(newCustomer);
          res.json("Reservation made!");
      } else {
          waitlist.push(newCustomer);
          res.json("You are on the waitlist!");
      }

    //   console.log(newCustomer);
  });

  app.post("/api/clear", function(req, res) {
    // Clear out the table and wait lists (No POST data required) and THEN 
    tables = [];
    waitlist = [];
    // console.log(tables);
    // console.log(waitlist);
    console.log("customers cleared");
    var successMessage = [{
        success: true
    }];
    res.send(successMessage);
  });

  app.post("/api/removeTb/:id", function (req, res){
    const id = req.params.id;
    const newList = tables.filter(table => table.customerID != id);
    tables = [...newList];

  })

  app.post("/api/removeWL/:id", function (req, res){
    const id = req.params.id;
    const newList = waitlist.filter(table => table.customerID != id);
    waitlist = [...newList];

  })


  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });