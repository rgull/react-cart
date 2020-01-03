let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../config/api-config');
let should = chai.should();

let server = '192.168.18.114:9890/api';


chai.use(chaiHttp);

describe('/GET products', () => {
    it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/products')
            .end((err, res) => {
                res.should.have.status(200);
                //   console.log("body",res.body);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(101);
                done();
            });
    });
});

describe('/GET products By Id', () => {
    it('it should GET one Product By ID ', (done) => {
        chai.request(server)
            .get('/products/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET products By Id', () => {
    it('it should GET one Product By ID ', (done) => {
        chai.request(server)
            .get('/products/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET products By Search', () => {
    it('it should GET Product By Matched String', (done) => {
        chai.request(server)
            .get('/products/search/COAT')
            .end((err, res) => {
                // console.log("body",res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET products By Category Id', () => {
    it('it should GET Products By Category ID ', (done) => {
        chai.request(server)
            .get('/products/inCategory/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET products By Department Id', () => {
    it('it should GET Products By Department ID ', (done) => {
        chai.request(server)
            .get('/products/inDepartment/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET Products Details By Product Id', () => {
    it('it should GET Products Details By Product ID ', (done) => {
        chai.request(server)
            .get('/products/1/details')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});


describe('/GET Products locations By Product Id', () => {
    it('it should GET Products locations By Product ID ', (done) => {
        chai.request(server)
            .get('/products/1/locations')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});


describe('/GET Products reviews By Product Id', () => {
    it('it should GET Products reviews By Product ID ', (done) => {
        chai.request(server)
            .get('/products/1/reviews')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('/GET Products By Page Number', () => {
    it('it should GET Products By Page Number One Page Contain 20 Items ', (done) => {
        chai.request(server)
            .get('/products/page/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(20);
                done();
            });
    });
});