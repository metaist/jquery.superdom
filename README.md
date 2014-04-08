# jquery.superdom
jQuery plugin for DOM operations in non-XHTML namespaces.

## Why?
SVG has become incorporated into HTML5 and we now routinely have DOM nodes in
different namespaces. For example, sometimes an `<a>` tag is an
[HTMLAnchorElement][html-a], but it could be an [SVGAElement][svg-a].

[jQuery][jquery] is an excellent library for manipulating DOM nodes, but
[SVG is on the wontfix list][jquery-wontfix]. Also, I wanted to extend jQuery
rather than rewrite it (like [SVG DOM][svgdom]).

## Usage
Select and manipulate DOM nodes:

     $('circle')
        .addClass('test test2')
        .attr({cx: 10, cy: 50});

Create DOM nodes in other namespaces:

    $('<svg:text/>')
        .text('content')
        .appendTo($('body svg'));

    $('body svg').append('<svg:text>content</svg:text>');

Extend SuperDOM to understand new namespaces:

    $.extend($.ns, {math: 'http://www.w3.org/1998/Math/MathML'});
    $('<math:mrow>a &#x02062; <math:msup><math:mi>x</math:mi>' +
      '<math:mn>2</math:mn></math:msup> + b</math:mrow>').find('mn')

Select nodes by namespace and check if a node is in a namespace:

    $('a:ns(svg)');
    $('a:ns(http://www.w3.org/2000/svg)');
    $('text').hasNS('svg');


## Similar Efforts
  - [SVG DOM][svgdom] by Keith Wood
  - [SVG][svg-fn] function by Ben Olson

## License
Licensed under the [MIT License][mit].

[html-a]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
[jquery-wontfix]: http://contribute.jquery.org/wont-fix/#svg-vml-or-namespaced-elements-bugs
[jquery]: https://github.com/jquery/jquery
[svg-a]: https://developer.mozilla.org/en-US/docs/Web/API/SVGAElement
[svgdom]: http://keith-wood.name/svg.html#dom
[svg-fn]: http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html
[mit]: http://opensource.org/licenses/MIT