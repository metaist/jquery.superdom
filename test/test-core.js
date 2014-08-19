define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('core');
  xtest('version', function () {
    var pattern = /^\d\.\d\.\d(-.*)?$/;
    ok(pattern.exec($.superdom.version), 'Expect semver format.');
  });

  test('namespaces', function () {
    ok($.ns.xhtml, 'Expect XHTML namespace.');
    ok($.ns.svg, 'Expect SVG namespace.');
    ok(!$.ns.foo, 'Expect missing namespace to be empty.');
  });

  test('noConflict', function () {
    var tmp, obj, fn;

    tmp = $.superdom.noConflict();
    equal($.superdom, undefined, 'Expect superdom to be removed.');
    equal($.fn.hasNS, undefined, 'Expect hasNS to be removed.');

    obj = {};
    fn = tmp.fn;
    $.each(tmp, function (k, v) { if ('fn' !== k) { obj[k] = v; } });
    $.extend(true, $, obj);
    $.fn.extend(fn); // cleanup
    notEqual($.fn.hasNS, undefined, 'Expect hasNS to be reset.');

    tmp = $.superdom.noConflict('fn.hasNS');
    equal($.fn.hasNS, undefined, 'Expect hasNS to be removed.');

    obj = {};
    fn = tmp.fn;
    $.each(tmp, function (k, v) { if ('fn' !== k) { obj[k] = v; } });
    $.extend(true, $, obj);
    $.fn.extend(fn); // cleanup
    notEqual($.fn.hasNS, undefined, 'Expect hasNS to be reset.');

    tmp = $.superdom.noConflict('expr.:.ns');
    equal($.expr[':'].ns, undefined, 'Expect :ns to be removed.');

    obj = {};
    fn = tmp.fn;
    $.each(tmp, function (k, v) { if ('fn' !== k) { obj[k] = v; } });
    $.extend(true, $, obj);
    $.fn.extend(fn); // cleanup
  });
});
