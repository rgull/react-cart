let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../config/api-config');
let should = chai.should();

let server = '192.168.18.114:9890/api';


chai.use(chaiHttp);

describe('/GET Category', () => {
    it('it should GET all the Category', (done) => {
        chai.request(server)
            .get('/category')
            .end((err, res) => {
                res.should.have.status(200);
                //   console.log("body",res.body);
                // res.body.data.should.be.a('array');
                // res.body.data.length.should.be.eql(101);
                done();
            });
    });
});