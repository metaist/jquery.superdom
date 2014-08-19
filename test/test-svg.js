define(function (require) {
  require('superdom');
  var
    $ = require('jquery'),
    $svg = $('svg'),
    $circle = $('circle'),
    $math = $('math'),
    math_supported = $math.hasNS('math');

  module('svg');
  test('find', function () {
    equal($('circle').length, 1, 'Expect to find by tag name.');
    equal($('.class1').length, 1, 'Expect to find by class name.');

    $circle.addClass('class0');
    ok($('.class1.class0').length, 'Expect to find by multiple class name.');

    $circle.removeClass('class0'); // cleanup
  });

  test('attr', function () {
    var save = {cx: $circle.attr('cx'), cy: $circle.attr('cy')};

    $circle.attr('cx', 200);
    equal($circle.attr('cx'), '200', 'Expected multiple attr to work.');

    $circle.attr({cx: 100, cy: 150});
    equal($circle.attr('cx'), '100', 'Expected multiple attr to work.');
    equal($circle.attr('cy'), '150', 'Expected multiple attr to work.');

    $circle.attr(save); // cleanup
  });

  test('createDOM', function () {
    var lorem = 'lorem ipsum',
        $text = $('<svg:text />')
          .attr('id', 'test-id')
          .text(lorem);

    equal($text.length, 1, 'Expect to create a single tag.');
    equal($text.text(), lorem, 'Expect to set text content.');

    equal($text.attr('id'), 'test-id', 'Expect correct attribute value.');
    ok($text.hasNS($.ns.svg), 'Expect SVG namespace.');

    $text.appendTo($svg);
    ok($('text')[0], 'Expect <text> fragment to be added.');

    $text.remove(); // cleanup
  });

  test('buildFragment', function () {
  var lorem = 'lorem ipsum',
    $text = $('<svg:text>fragment:' + lorem + '</svg:text>');

    ok($text[0], 'Expect synthesized node.');
    ok($text.hasNS('svg'),'Expect SVG fragment namespace.');

    $text.appendTo($svg);
    ok($('text')[0], 'Expect <text> fragment to be added.');
    $text.remove(); // cleanup

    $text = $('<svg:rect width="250" height="250" style="fill:blue">' +
              '<svg:animate attributeType="CSS" attributeName="opacity" ' +
              'from="1" to="0" dur="5s" repeatCount="indefinite" />' +
              '</svg:rect>');
    $text.appendTo($svg);
    ok($('rect animate')[0], 'Expect <animate> to be added.');

    $text.remove(); // cleanup
  });
});
