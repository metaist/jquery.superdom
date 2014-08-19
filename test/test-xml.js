define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('xml');
  test('buildFragment', function () {
    var $node = $('<xml:root />').append('<xml:row>some content</xml:row>');
    ok($node[0], 'Expect fragment to exist.');
    ok($node.hasNS('xml'), 'Expect XML namespace.');
  });

  test('filter', function () {
    var $node = $('<xml:row>x</xml:row><xml:col>y</xml:col>');
    equal($node.filter('row').length, 1, 'Expect tag name filter to work.');
  });
});
