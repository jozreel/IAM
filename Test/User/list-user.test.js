const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIwLTA1LTI0VDE2OjA0OjUxLjY0NFoiLCJhcHAiOiI1ZWNhOGUzOTBmMDRmNjQ3Y2QzZDEwMWYifQ%3D%3D.OM19QEWKuzGCuulUwJa5BXYK5JEock%2B1JSDJhyqST3Y%3D';
describe('LIST ALL ADDED USERS', () => {
    it ('should list all the added userds to the libvrary', (done) => {
        chai.request(server).get('/api/user').set('api', token).end((err,res) => {
            res.status.should.be.eql(200);
            res.body.should.have.property('length');
            res.body.length.should.be.gt(0);
            console.log(res.body);
            done();
        });
    });
});