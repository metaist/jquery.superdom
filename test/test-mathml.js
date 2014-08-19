define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('mathml');
  test('buildFragment', function () {
    $.extend($.ns, {math: 'http://www.w3.org/1998/Math/MathML'});
    var $node = $math.append(
      '<math:mrow>a &InvisibleTimes; <math:msup><math:mi>x</math:mi>' +
      '<math:mn>2</math:mn></math:msup> + b</math:mrow>'
    ), $mn = $node.find('mn');

    ok($mn[0], 'Expect nested node to exist.');
    ok($mn.hasNS('math'), 'Expect MathML namespace.');

    $node.remove(); // cleanup
  });
});
