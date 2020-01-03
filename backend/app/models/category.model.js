var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var categoryModel = {
    getCategory: getCategory,
}


function getCategory(categoryData) {
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM category",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });  

}


module.exports = categoryModel;



