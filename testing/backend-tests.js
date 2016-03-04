var chai = require('chai'),
    sinonChai = require('sinon-chai');

global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(sinonChai);

describe('It should be equal to one', function(){
  it('1 should equal 1', function(){
    expect(1).to.equal(1);
  });
});