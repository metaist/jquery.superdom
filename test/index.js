(function () {
  window.xtest = function () {}; // no-op
  require.config({ baseUrl: '..' });
  require([
    'order!src/jquery.superdom',
    'order!test-core.js',
    'order!test-svg.js',
    'order!test-xml.js',
    'order!test-mathml.js',
    'order!test-html.js',
    'order!test-options.js',
    'order!test-fn.js'
  ], function () {
    QUnit.load();
    QUnit.start();
  });
}());
