var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors')
var adminController = require("./controllers/adminController")
var menuController = require("./controllers/menuController")
var paymentController = require("./controllers/paymentsController")
var orderController = require("./controllers/ordersController")

var restaurantController = require("./controllers/restaurantController")
var customerController = require("./controllers/customerController")
var ordersController = require("./controllers/ordersController")
var url = 'mongodb://localhost:27017/delhivery';
var auth_middleware = require('./lib/auth_middleware');

//mongoose connect to database with the url
mongoose.connect(url, function(err) {
  if(err) {
    console.log("Please check if MongoDB is up and running", err);
  } else {
    //bodyparser to convert incoming request body to object
    app.use(bodyParser.json());
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(auth_middleware());
    //registering the controller to the app
    adminController.controller(app);
    menuController.controller(app);

    paymentController.controller(app);
    orderController.controller(app);

    customerController.controller(app);
    restaurantController.controller(app);

    ordersController.controller(app);

    //app listening on 3000 port
    app.listen(3000, function () {
      console.log('TodoList App listening on port 3000!')
    })
  }
});

module.exports = app;
