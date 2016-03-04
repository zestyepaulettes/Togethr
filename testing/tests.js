var expect = chai.expect;
var should = chai.should();

describe('Check if all the components exist', function(){
  it('App component should exist', function(){
    expect(App).to.not.equal(undefined);
  });
  it('ContactUs component should exist', function(){
    expect(ContactUs).to.not.equal(undefined);
  });
  it('DontKnow component should exist', function(){
    expect(DontKnow).to.not.equal(undefined);
  });
  it('Login component should exist', function(){
    expect(Login).to.not.equal(undefined);
  });
  it('Main component should exist', function(){
    expect(Main).to.not.equal(undefined);
  });
  it('Option component should exist', function(){
    expect(Option).to.not.equal(undefined);
  });
  it('QuestionList component should exist', function(){
    expect(QuestionList).to.not.equal(undefined);
  });
  it('ResultList component should exist', function(){
    expect(ResultList).to.not.equal(undefined);
  });
  it('ResultListEntry component should exist', function(){
    expect(ResultListEntry).to.not.equal(undefined);
  });
  it('SignUpTechie component should exist', function(){
    expect(SignUpTechie).to.not.equal(undefined);
  });
  it('SocialMedia component should exist', function(){
    expect(SocialMedia).to.not.equal(undefined);
  });
});

describe('Check if the database tables exist', function(){
  describe('Check if the techieSchema has all the columns', function(){

  });
});