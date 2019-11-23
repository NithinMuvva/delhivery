var Q = require('q');
var customerData = require('../models/customer');

module.exports = {
    //find all customers in the collection

    findAllCustomers: function() {
        var deferred = Q.defer();
        customerData.find()
            .then(function(customerData) {
                deferred.resolve(customerData);
            })
            .catch(function(err) {
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },

    // find customer by id

    findCustomerById: function(id){
        var deferred = Q.defer();
        customerData.findById(id)
            .then(function(customerData){
                deferred.resolve(customerData);
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            });
            return deferred.promise;
    },

    // create customer with all data

    createCustomer: function(body){
        var deferred = Q.defer();
        var customer =  new customerData();
        customer.username = body.username;
        customer.password = body.password;
        customer.name = body.name;
        customer.email = body.email;
        customer.phone = body.phone;

        customer.save()
            .then(function(obj){
                obj = obj.toObject();
                deferred.resolve(obj);
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            })

            return deferred.promise;
    },

    updateCustomer: function(id, body) {
        var deferred = Q.defer();
        customerData.findById(id)
            .then(function(customerData) {
                if('username' in body){
                    customerData.username = body.username;
                }
                if("password" in body){
                    customerData.password = body.password;
                }
                if("name" in body){
                    customerData.name = body.name;
                }
                if("email" in body){
                    customerData.email = body.email;
                }
                if("phone" in body){
                    customerData.phone = body.phone;
                }
                return customerData.save();
            })
            .then(function(todolist) {
                deferred.resolve(todolist);
            })
            .catch(function(err) {
                deferred.reject({message: "Internal Server Error", error: err});
            });
        return deferred.promise;
      },

      delete: function(id) {
          var deferred = Q.defer();
          customerData.remove({_id: id})
            .then(function(customer){
                deferred.resolve({message: 'Successfully deleted', object: customer})
            })
            .catch(function(err){
                deferred.reject({message: "Internal Server Error", error: err});
            });
            return deferred.promise;
      }
  

};