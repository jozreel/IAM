const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');

describe('ADD A USER', () => {
    const userdata = {fullname: 'Ras Wasyn', email:'ras.wasyn@mail.com', password: 'p8ssw0rd',  applications:[{appid: '5eca91b2b696117340b32f94', role: 5}]}
    it('should have inserted a user to the database', (done) => {
        chai.request(server).post('/api/user').send(userdata).end((err, res) => {
            res.status.should.be.eql(201);
            res.body.should.have.property('_id');
            done();
        });
    });
});
