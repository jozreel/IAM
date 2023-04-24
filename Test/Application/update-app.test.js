const chai =  require('chai');
const mocha =  require('mocha');
const chaihttp =  require('chai-http');
chai.use(chaihttp);
const should =  chai.should();
const server = require('../../index');

describe('UPDATE AN APPLICATION', () => {
    describe('GENEREATE API KEY FOR APPLICATION', () => {
        const appid = '5eca91b2b696117340b32f94';
        it ('should have generated an api key for a given application', (done) => {
            chai.request(server).patch(`/api/app/${appid}`).send({disabled: false, roles: [
                { rolename: 'adduser', roleid: 3 },
                { rolename: 'Update Apps', roleid: 4 },
                {rolename: 'Viewer'}
              ]
              }).end((err, res) => {
                res.status.should.be.eql(200);
                res.body.should.have.property('apikey').which.is.a.string;
                done();
            });
        });
    });
});
