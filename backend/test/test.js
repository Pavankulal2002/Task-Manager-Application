// Import the required modules
const chai = import('chai');
const chaiHttp = import('chai-http');
const app = import('../src/app'); // Import your Express app
const expect = chai.expect;

// Configure chai to use the http plugin
chai.use(chaiHttp);

// Describe your test suite
describe('API Tests', function() {
  // Test for GET request to /api/users
  describe('GET /task/logout', function() {
    it('it should give error', function(done) {
      // Send a GET request to the server
      chai.request(app)
        .get('/task/logout')
        .end(function(err, res) {
          // Check for errors
          expect(err).to.be.null;
          // Check the status code
          expect(res).to.have.status(401);
          // Check the response type
          expect(res).to.be.json;
          // Check the response body
          expect(res.body).to.be.an('array');
          // Check if the array is not empty
          expect(res.body).to.have.length.above(0);
          // Call done to finish the test
          done();
        });
    });
  });

  // Add more tests for other endpoints as needed
});