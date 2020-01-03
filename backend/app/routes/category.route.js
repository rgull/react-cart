const categoryService = require('../services/category.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


const jwt = require('jsonwebtoken');

function init(router) {
    router.route('/category')
        .get(category); 
}

function category(req,res) {
  console.log("data",req.body);
  var categoryData=req.body;
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, categoryData, "category");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

   categoryService.getCategory(categoryData).then((data) => {
   if(data) {
      var username = data.username;
      const token = jwt.sign({username},'my_secret_key',{ expiresIn: 60*60*24 });
      res.json({
        "success":true,
        "data":data,
        "token":token
      });
    }
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}


module.exports.init = init;



