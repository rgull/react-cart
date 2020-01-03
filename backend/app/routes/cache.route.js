// const productService = require('../services/product.service');
// var schema = require('../schema/userValidationSchema.json')
// var iValidator = require('../../common/iValidator');
// var errorCode = require('../../common/error-code');
// var errorMessage = require('../../common/error-methods');
// var mail = require('./../../common/mailer.js');

// var cache = (duration) => {
//     return (req, res, next) => {
//       let key = '__express__' + req.originalUrl || req.url
//       let cachedBody = mcache.get(key)
//       if (cachedBody) {
//         res.send(cachedBody)
//         return
//       } else {
//         res.sendResponse = res.send
//         res.send = (body) => {
//           mcache.put(key, body, duration * 1000);
//           res.sendResponse(body)
//         }
//         next()
//       }
//     }
//   }
  
//   app.get('/', cache(10), (req, res) => {
//     setTimeout(() => {
//       res.render('index', { title: 'Hey', message: 'Hello there', date: new Date()})
//     }, 5000) //setTimeout was used to simulate a slow processing request
//   })

// module.exports.init = init;
