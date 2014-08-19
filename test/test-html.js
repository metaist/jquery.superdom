define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('html');
  test('buildFragment', function () {
    var $text = $('<a>');

    //See #1: single tag
    equal($text[0].nodeName.toUpperCase(), 'A', '#1: Expect single-letter tag.');

    //See #2: named entities
    $text = $('<span>&times;</span>');
    equal($text[0].innerHTML, '\u00D7', '#2: Expect parsed named entities.');

    //See #5: child tag order
    $text = $('<div><span>A</span><span>B</span></div>');
    equal($text[0].innerHTML, '<span>A</span><span>B</span>',
          '#5: Expect child nodes in correct order.');

    $text = $('<div>html fragment</div>');
    ok($text[0], 'Expect synthesized node.');
    ok($text.hasNS('xhtml'),'Expect HTML fragment namespace.');

    $text.insertAfter($svg);
    ok($text[0], 'Expect node to be attached.');

    $text.remove(); // cleanup
  });
});
