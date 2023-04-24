const mocha =  require('mocha');
const chai =  require('chai');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should = chai.should();
const server = require('../../index');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIwLTA1LTI0VDE2OjA0OjUxLjY0NFoiLCJhcHAiOiI1ZWNhOGUzOTBmMDRmNjQ3Y2QzZDEwMWYifQ%3D%3D.OM19QEWKuzGCuulUwJa5BXYK5JEock%2B1JSDJhyqST3Y%3D';

describe('ADD AN APPLICATION', () => {
    describe('POST: /api/app', () => {
        const appdata = {applicationname: 'Most Awesome App 3', roles: [{
            rolename: 'adduser',
            roleid: 1

        }]};
        it('Should have added an application to the database', (done) => {
            chai.request(server).post('/api/app').send(appdata).end((err, res) => {
                res.status.should.be.eql(201);
                res.body.should.have.property('_id').which.is.a.string;
                done();
            })
        })
    })
});