define(function (require) {
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('options');
  test('keepNSPrefix', function () {
    var $t1, $t2, dom, save = $.superdom.options.keepNSPrefix;

    $.superdom.options.keepNSPrefix = false;
    $t1 = $('<svg:text />').appendTo($svg);
    dom = $t1[0];
    equal(dom.nodeName, 'text', 'Expect tag namespace to be removed.');

    $.superdom.options.keepNSPrefix = true;
    $t2 = $('<svg:text />').appendTo($svg);
    dom = $t2[0];
    equal(dom.nodeName, 'svg:text', 'Expect tag namespace to be preserved.');

    equal($('*|text').length, 2, 'Expected both tags to match tag filter.');
    equal($('svg\\:text,text').length, 2, 'Expected both tags to match tag filter.');

    // cleanup
    $t1.add($t2).remove();
    $.superdom.options.keepNSPrefix = save;
  });
});
