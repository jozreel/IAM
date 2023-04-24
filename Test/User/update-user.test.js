const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIwLTA1LTI0VDE2OjA0OjUxLjY0NFoiLCJhcHAiOiI1ZWNhOGUzOTBmMDRmNjQ3Y2QzZDEwMWYifQ%3D%3D.OM19QEWKuzGCuulUwJa5BXYK5JEock%2B1JSDJhyqST3Y%3D';

describe('UPDATE A USER', () => {
    it ('should update an existing user given the ID', (done) => {
        const uid = '5ecab41905e8ec1c56a9697b';
        const upddata = {applications: [{appid: '5eca8e390f04f647cd3d101f', role:'ADMIN'}]};
        chai.request(server).patch(`/api/user/${uid}`).set("api", token).send(upddata).end((err,res) => {
            res.status.should.be.eql(200);
            console.log(res.body);
            done();
        });
    });
});