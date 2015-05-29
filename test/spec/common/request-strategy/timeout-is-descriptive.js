var test = require('tape');

test('when a timeout occurs, we get a descriptive error', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      timeout: 20
    }
  });

  var index = fixture.index;

  fauxJax.install();
  fauxJax.on('request', function() {});

  index.search('something', function(err) {
    fauxJax.restore();
    t.ok(err instanceof Error);

    t.equal(
      err.name,
      'AlgoliaSearchRequestTimeoutError',
      'error name matches'
    );

    t.equal(
      err.message,
      'Request timedout before getting a response',
      'error messag ematches'
    );
  });
});
