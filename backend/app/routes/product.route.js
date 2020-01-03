const productService = require('../services/product.service');
var express = require('express');
var app = express();
var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
var mcache = require('memory-cache');


function init(router) {
    router.route('/products')
        .get(cache(10), getProducts)
    router.route('/products/:id')
        .get(cache(10), getProductsById)
    router.route('/products/search/:searchstring')
        .get(cache(10),getProductSearch)
    router.route('/products/inCategory/:id')
        .get(cache(10),getProductfromCategory)
    router.route('/products/inDepartment/:id')
        .get(cache(10),getProductfromDepartment)
    router.route('/products/:id/details')
        .get(cache(10),getProductDetailById)
    router.route('/products/:id/locations')
        .get(cache(10),getProductLocationsById)
    router.route('/products/:id/reviews')
        .get(cache(10),getProductReviewsById)
        .post(addProductReviewsById);
    router.route('/products/page/:page')
        .get(cache(10),getProductsByPageNumber)
    router.route('/attributes/inProduct/:id')
    .get(cache(10),getProductAttributes)
    router.route('/products/filter/:min/:max')
    .get(cache(10),filterProductByPrice)
}

app.set('view engine', 'jade');

var cache = (duration) => {
    return (req, res, next) => {
    //   let key = '__express__' + req.originalUrl || req.url
    let key = '__express__' + req.url

      console.log('Key', key)
      let cachedBody = mcache.get(key)
      if (cachedBody) {
          console.log('Cached')
        res.send(cachedBody)
        return
      } else {
          console.log('Not Cached Yet')
        res.sendResponse = res.send
        // console.log('Response Sent', res.send)
        // console.log('Response', res)
        res.send = (body) => {
            // console.log('Body', body)
          mcache.put(key, body, duration * 360000, (key, value) => console.log('Expired', key, value));
          res.sendResponse(body)
        }
        next()
      }
    }
  }

function getProductAttributes(req, res) {
    var productId = req.params;
    const productService = require('../services/product.service');
    productService.getProductAttributes(productId).then((data)=> {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function filterProductByPrice(req, res) {
    console.log('Request',req.params);
    var min = req.params.min;
    var max = req.params.max;
    const productService = require('../services/product.service');
    productService.filterProductByPrice(min, max).then((data)=> {
        res.json({
            "data":data,
            "count": data.length
          });
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProducts(req, res) {
    var product=res.body
    const productService = require('../services/product.service');
    console.log('Get Products', req.url)
    productService.getProduct(product).then((data) => {
        res.json({
            "data":data,
            "count": data.length
          });
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductsById(req, res) {
    var productId = req.params;
    const productService = require('../services/product.service');
    productService.getProductsById(productId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductSearch(req, res) {
    var searchString = req.params;
    const productService = require('../services/product.service');
    productService.getProductSearch(searchString).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductfromCategory(req, res) {
    var categoryId=req.params
    const productService = require('../services/product.service');
    productService.getProductfromCategory(categoryId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductfromDepartment(req, res) {
    var departmentId=req.params
    const productService = require('../services/product.service');
    productService.getProductfromDepartment(departmentId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

getProductDetailById

function getProductDetailById(req, res) {
    var productId = req.params;

    const productService = require('../services/product.service');
    productService.getProductDetailById(productId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductLocationsById(req, res) {
    var productId = req.params;
    const productService = require('../services/product.service');
    productService.getProductLocationsById(productId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function getProductReviewsById(req, res) {
    var productId = req.params;
    const productService = require('../services/product.service');
    productService.getProductReviewsById(productId).then((data) => {
        res.send(data);
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}

function addProductReviewsById(req, res) {
    var productId = req.params;
    var reviewData = req.body;

    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, reviewData, "review");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }

    productService.addProductReviewsById(productId, reviewData).then((data) => {
        res.json(data);
    }).catch((err) => {
        mail.mail(err);
        res.json(err);
    });

}

function getProductsByPageNumber(req, res) {
    var pageNumber = req.params;
    console.log("page",pageNumber);

    const productService = require('../services/product.service');
    productService.getProductsByPageNumber(pageNumber).then((data) => {
        res.json({
            "data":data,
          });
    }).catch((err) => {
        mail.mail(err);
        res.send(err);
    });
}
module.exports.init = init;
