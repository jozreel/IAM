const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIwLTA1LTI0VDE2OjA0OjUxLjY0NFoiLCJhcHAiOiI1ZWNhOGUzOTBmMDRmNjQ3Y2QzZDEwMWYifQ%3D%3D.OM19QEWKuzGCuulUwJa5BXYK5JEock%2B1JSDJhyqST3Y%3D';

describe('LOGIN A USER THE SERVICE', () => {
    const userdata = {email: 'ras.wasyn@mail.com', password: 'poonger', appid: '5eca91b2b696117340b32f94'};
    it('should have inserted a user to the database', (done) => {
        chai.request(server).post('/api/login').set('api', `${token}`).send(userdata).end((err, res) => {
            res.status.should.be.eql(201);
            res.body.should.have.property('token');
            console.log(res.body);
            done();
        });
    });
});
