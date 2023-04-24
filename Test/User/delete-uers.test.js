const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');
describe('DELETE A USER', () => {
    const userid = '5ecab37bf8c29513e26e62fc';
    it ('should remove a a user given the id', (done) => {
        chai.request(server).delete(`/api/user/${userid}`).end((err, res) => {
            res.status.should.be.eql(200);
            res.body.should.have.property('deletedCount');
            res.body.deletedCount.should.be.eql(1);
            done();
        });
    });
});