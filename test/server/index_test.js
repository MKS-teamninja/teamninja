require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var routes = require(__server + '/index.js')

describe("serving assests", function() {

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
    yield request(app)
      .get('/')
      .expect(200)
      .expect(function(response){
        expect(response.res.text.startsWith('<html>'));
      })
  });
  // don't need promisified version
  // we also determined in the test env not to use the catch all route
  // otherwise it may send 200 response code for wrong reason/url endpoint
  // it("serve up index", function(done) {
  //   request(app)
  //     .get('/snothing')
  //     .expect(function(response){
  //       expect(response.res.text.startsWith('<html>'));
  //     })
  //     .expect(200, done)
  // });
});

describe("Server API call will fetch from database and return JSON", function() {

  var app = TestHelper.createApp();
  app.use('/', routes)
  app.testReady()

  it_("get back json searching cs by cgId, cgId=820400", function * () {
    yield request(app)
      .get('/searchcs?cgId=820400')
      .expect('Content-Type',/application\/json/)
      .expect(200)
      .expect(function(response){
        var json = response.res.body;
        expect(json.length,10); // should get back 10 campsites
        expect(json[0].campsite_id,4342); // first should be campsite_id of 4342
      })
  });
  it_("get back json searching campgrounds by lat/lon", function * () {
    yield request(app)
      .get('/searchcg?lat=30.482761&lon=-97.6564032&rad=20')
      .expect('Content-Type',/application\/json/)
      .expect(200)
      .expect(function(response){
        var json = response.res.body;
        expect(json.length,4); // should get back 4 campsites
        expect(json[0].campground_id,13);
        expect(json[3].campground_id,95);
      })
  });
  it_("get back empty array searching campgrounds by lat/lon outside TX", function * () {
    yield request(app)
      .get('/searchcg?lat=39.482761&lon=-107.6564032&rad=20')
      .expect('Content-Type',/application\/json/)
      .expect(200)
      .expect(function(response){
        var json = response.res.body;
        expect(Array.isArray(json),true);
        expect(json.length,0);
      })
  });
  it_("get back empty array searching cs by cgId with non exisiting cgId, cgId=75255", function * () {
    yield request(app)
      .get('/searchcs?cgId=75455')
      .expect('Content-Type',/application\/json/)
      .expect(200)
      .expect(function(response){
        var json = response.res.body;
        expect(Array.isArray(json),true);
        expect(json.length,0);
      })
  });

});