var productModel = require("../models/product.model");


var productService = {
    getProduct: getProduct,
    getProductsById: getProductsById,
    getProductSearch:getProductSearch,
    getProductfromCategory:getProductfromCategory,
    getProductfromDepartment:getProductfromDepartment,
    getProductDetailById:getProductDetailById,
    getProductLocationsById:getProductLocationsById,
    getProductReviewsById:getProductReviewsById,
    getProductsByPageNumber:getProductsByPageNumber,
    addProductReviewsById: addProductReviewsById,
    getProductAttributes: getProductAttributes,
    filterProductByPrice: filterProductByPrice
}

function addProductReviewsById(id, data) {
    return new Promise((resolve,reject) => {
        productModel.addProductReviewsById(id, data).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getProductAttributes(productId) {
    return new Promise((resolve, reject) => {
        productModel.getProductAttributes(productId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

function filterProductByPrice(min, max) {
    return new Promise((resolve, reject) => {
        productModel.filterProductByPrice(min, max).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

function getProduct(productData) {
    return new Promise((resolve, reject) => {
        productModel.getProduct(productData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getProductsById(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductsById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductSearch(searchstring) {
    return new Promise((resolve, reject) => {
        productModel.getProductSearch(searchstring).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductfromCategory(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductfromCategory(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductfromDepartment(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductfromDepartment(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductDetailById(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductDetailById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductLocationsById(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductLocationsById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductReviewsById(id) {
    return new Promise((resolve, reject) => {
        productModel.getProductReviewsById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getProductsByPageNumber(page) {
    return new Promise((resolve, reject) => {
        productModel.getProductsByPageNumber(page).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = productService;

