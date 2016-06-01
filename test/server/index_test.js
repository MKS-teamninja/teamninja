require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp();
  app.use('/', routes)
  app.testReady()

  it_("serves app-bundle.js", function * () {
    this.timeout(5000);

    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
      .get('/app-bundle.js')
      .expect('Content-Type',/javascript/)
      .expect(200)
  });

  it_("serve up index", function * () {
    this.timeout(5000);
    yield request(app)
      .get('/')
      .expect(200)
      .expect(function(response){
        expect(response.res.text.startsWith('<html>'));
      })
  });
  //don't need promisified version
  it("serve up index", function(done) {
    request(app)
      .get('/snothing')
      .expect(function(response){
        expect(response.res.text.startsWith('<html>'));
      })
      .expect(200, done)
  });
})
