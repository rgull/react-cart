const productService = require('../services/product.service');
var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
var express = require("express");
const stripe = require("stripe")("sk_test_N5v7KBl71W9YRmIM7UUs3r6o");
const app = express();

app.use(require("body-parser").text());


function init(router) {
    router.route('/payment/:amount')
    .post(authenticateStripe)
}

function authenticateStripe(req, res){
    console.log('Params', req.params)
    try {
        let {status} = stripe.charges.create({
          amount: req.params,
          currency: "usd",
          description: "An example charge",
          source: req.body
        });
    
        res.json({status});
        console.log('Success')
      } catch (err) {
        console.log('Error')
        res.status(500).end();
      }
}

module.exports.init = init;
