# jquery.superdom
[Latest Release] - [Documentation] - [Issues]

_jQuery plugin for DOM operations in non-XHTML namespaces._

[Latest Release]: https://github.com/metaist/jquery.superdom/releases/latest
[Documentation]: https://github.com/metaist/jquery.superdom/wiki
[Issues]: https://github.com/metaist/jquery.superdom/issues

## Why?
Now that SVG is part of HTML5, our code often contains DOM nodes from different
namespaces. For example, sometimes an `<a>` tag is an [HTMLAnchorElement], but
it could be an [SVGAElement].

[jQuery] is an excellent library for manipulating DOM nodes, but
[SVG is on the wontfix list][jquery-wontfix]. Also, I wanted to extend jQuery
rather than rewrite it (like [SVG DOM]).

[jQuery]: https://github.com/jquery/jquery
[jquery-wontfix]: http://contribute.jquery.org/wont-fix/#svg-vml-or-namespaced-elements-bugs
[HTMLAnchorElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
[SVGAElement]: https://developer.mozilla.org/en-US/docs/Web/API/SVGAElement

## Usage
Select and manipulate DOM nodes:
```javascript
$('circle')
  .addClass('test test2')
  .attr({cx: 10, cy: 50});
```

Create DOM nodes in other namespaces:
```javascript
$('<svg:text/>')
    .text('content')
    .appendTo($('body svg'));

$('body svg').append('<svg:text>content</svg:text>');
```

Extend SuperDOM to understand new namespaces:
```javascript
$.extend($.ns, {math: 'http://www.w3.org/1998/Math/MathML'});
$('<math:mrow>a &#x02062; <math:msup><math:mi>x</math:mi>' +
  '<math:mn>2</math:mn></math:msup> + b</math:mrow>').find('mn')
```

Select nodes by namespace and check if a node is in a namespace:
```javascript
$('a:ns(svg)');
$('a:ns(http://www.w3.org/2000/svg)');
$('text').hasNS('svg');
```

Read more in the [documentation].

## Influenced By
  - [SVG DOM] by Keith Wood (more of a jQuery re-write)
  - [SVG function] function by Ben Olson (only creates SVG nodes)

[SVG DOM]: http://keith-wood.name/svg.html#dom
[SVG function]: http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html

## License
Licensed under the [MIT License].

[MIT License]: http://opensource.org/licenses/MIT
