define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('fn');
  test('hasNS', function () {
    ok($svg.hasNS($.ns.svg), 'Expect SVG namespace.');
    ok($circle.hasNS('svg'), 'Expect SVG namespace.');
    ok($('div').hasNS('xhtml'), 'Expect XHTML namespace.');
    ok(!$('div').hasNS('svg'), 'Do not expect namespace.');
  });

  test(':ns', function () {
    var $nodes = $(':ns(svg)'), check = $nodes.hasNS($.ns.svg);
    $nodes.each(function () {
      if (this.namespaceURI !== $.ns.svg) { check = false; }
    });

    ok(check, 'Expect all nodes to be in the SVG namespace.');
  });

  test('hasClass', function () {
    ok($circle.length, 'Expect a selection.');
    ok($circle.hasClass('class1'), 'Expect class to be found.');
    ok(!$circle.hasClass('class0'), 'Do not expect missing class.');
  });

  test('addClass', function () {
    var oldClasses, newClasses;

    // Signature 1
    $circle.addClass('class2');
    ok($circle.hasClass('class2'), 'Expect new class added.');

    oldClasses = $circle[0].getAttribute('class');
    $circle.addClass('class2');
    newClasses = $circle[0].getAttribute('class');
    equal(newClasses, oldClasses, 'Do not expect classes to be duplicated.');

    $circle.removeClass('class2'); // reset

    // Signature 2
    $circle.addClass(function (i, currentClass) {
      equal(i, 0, 'Expect only a single item.');
      equal(currentClass, 'class1', 'Do not expect other classes.');

      return 'class3';
    });

    ok($circle.hasClass('class3'), 'Expect class added from function.');

    $circle.removeClass('class3'); // reset
  });

  test('removeClass', function () {
    $circle.addClass('class4');

    // Signature 1
    $circle.removeClass('class4');
    ok(!$circle.hasClass('class4'), 'Expect to remove classes.');

    // Signature 2
    $circle.removeClass(function (i, currentClass) {
      equal(i, 0, 'Expect only a single item.');
      equal(currentClass, 'class1', 'Do not expect other classes.');

      return this.getAttribute('class');
    });

    ok(!$circle.hasClass('class1'), 'Expect class removed from function.');

    $circle.addClass('class1');
  });

  test('toggleClass', function () {
    // Signature 1
    var hasClass = $circle.hasClass('class5');
    $circle.toggleClass('class5');
    equal($circle.hasClass('class5'), !hasClass, 'Expect to toggle class.');
    $circle.toggleClass('class5'); // reset

    // Signature 2
    $circle.toggleClass('class6', true);
    ok($circle.hasClass('class6'), 'Expect to add class.');

    $circle.toggleClass('class6', false);
    ok(!$circle.hasClass('class6'), 'Expect to remove class.');

    // Signature 3
    $circle.toggleClass();
    equal($circle.attr('class'), '', 'Expect all classes removed.');
    $circle.toggleClass(); // reset
    notEqual($circle.attr('class'), '', 'Expect classes restored.');

    $circle.toggleClass(false);
    equal($circle.attr('class'), '', 'Expect all classes removed.');

    $circle.toggleClass(true);
    notEqual($circle.attr('class'), '', 'Expect classes restored.');

    // Signature 4
    var func = function (index, className, stateVal) { return 'class7'; };

    $circle.toggleClass(func);
    ok($circle.hasClass('class7'), 'Expect class added.');

    $circle.toggleClass(func);
    ok(!$circle.hasClass('class7'), 'Expect class removed.');

    $circle.toggleClass(func, true);
    ok($circle.hasClass('class7'), 'Expect class added.');

    $circle.toggleClass(func, false);
    ok(!$circle.hasClass('class7'), 'Expect class removed.');
  });
});
