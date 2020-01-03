var categoryModel = require("../models/category.model");


var categoryService = {
    getCategory: getCategory
}

function getCategory(categoryData) {
    return new Promise((resolve,reject) => {
        categoryModel.getCategory(categoryData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


module.exports = categoryService;

