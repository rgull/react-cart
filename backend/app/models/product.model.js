var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var productModel = {
    getProduct: getProduct,
    getProductsById: getProductsById,
    getProductSearch: getProductSearch,
    getProductfromCategory: getProductfromCategory,
    getProductfromDepartment: getProductfromDepartment,
    getProductDetailById: getProductDetailById,
    getProductLocationsById: getProductLocationsById,
    getProductReviewsById: getProductReviewsById,
    getProductsByPageNumber: getProductsByPageNumber,
    addProductReviewsById: addProductReviewsById,
    getProductAttributes: getProductAttributes, 
    filterProductByPrice: filterProductByPrice
}

function addProductReviewsById(id, data) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO review VALUES('" + 17 + "','" + 18 + "','" + id.id + "','" + data.name + "','" + data.rating + "','" + '2019-02-19 13:57:29' + "')", (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                console.log('Review Posted')
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductAttributes(productId) {
    console.log('Product Id', productId);
    return new Promise((resolve, reject) => {
        db.query(`SELECT attribute_value.attribute_value_id, attribute_value.value, attribute.name
        FROM attribute_value
        INNER JOIN attribute ON attribute.attribute_id=attribute_value.attribute_id 
        INNER JOIN product_attribute ON product_attribute.attribute_value_id=attribute_value.attribute_value_id 
        WHERE product_attribute.product_id=` + productId.id, (error, rows, fields) => {
                if (!!error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else {
                    dbFunc.connectionRelease;
                    resolve(rows);
                }
            });
    })
}

function filterProductByPrice(min, max) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product WHERE product.price BETWEEN '" + min + "' AND '" + max + "'", (error, rows, fields) => {
                if (!!error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else {
                    dbFunc.connectionRelease;
                    resolve(rows);
                }
            });
    })
}


function getProduct(productData) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product", (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });

}


function getProductsById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product WHERE product_id =" + id.id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductSearch(searchstring) {
    return new Promise((resolve, reject) => {
        var $query = "SELECT * FROM product WHERE product.description LIKE '%" + searchstring.searchstring + "%' || product.name LIKE '%" + searchstring.searchstring + "%'";
        db.query($query, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductfromCategory(id) {
    return new Promise((resolve, reject) => {
        var $query = "SELECT * FROM product  join product_category on product.product_id = product_category.product_id where product_category.category_id =" + id.id;
        db.query($query, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductfromDepartment(id) {
    return new Promise((resolve, reject) => {
        var $query = `SELECT * FROM product
          join product_category on product.product_id = product_category.product_id
          join category on product.product_id = category.category_id
           where category.department_id =` + id.id;
        db.query($query, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductDetailById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product WHERE product_id =" + id.id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductLocationsById(id) {
    return new Promise((resolve, reject) => {
        var $query = `SELECT category.category_id,category.name as category_name,department.department_id,department.name as department_name
        FROM product
        join product_category on product.product_id = product_category.product_id 
        join category on product_category.category_id = category.category_id
        join department on category.department_id = department.department_id
        where product.product_id =` + id.id;
        db.query($query, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getProductReviewsById(id) {
    console.log('Review Id', id.id)
    return new Promise((resolve, reject) => {
        var $query = `SELECT * FROM review where product_id=`;
        db.query($query + id.id, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                console.log('Rows', rows)
                resolve(rows);
            }
        });
    });
}

function getProductsByPageNumber(page) {
    $items_per_page = 20;
    $offset = (page.page - 1) * $items_per_page;
    $sql = "SELECT * FROM product LIMIT " + $offset + "," + $items_per_page;
    return new Promise((resolve, reject) => {
        db.query($sql, (error, rows, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
        });
    });
}

module.exports = productModel;



