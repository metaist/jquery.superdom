/*! SuperDOM jQuery Plugin v0.0.1 | (c) 2013 Metaist | http://opensource.org/licenses/MIT */
/*jslint indent: 2, maxlen: 80, browser: true */
/*global require, define, jQuery */
(function (factory) {
  'use strict';
  if ('function' === typeof define && define.amd) {
    define(['jquery'], factory); // register anonymous AMD module
  } else { factory(jQuery); } // browser globals
}(function (jQuery) {
  'use strict';
  var $ = jQuery,
    rclass = /[\t\r\n\f]/g,
    rnotwhite = /\S+/g,
    strundefined = typeof undefined,
    orig = {
      addClass: $.fn.addClass,
      removeClass: $.fn.removeClass,
      toggleClass: $.fn.toggleClass,
      hasClass: $.fn.hasClass
    },

    normClass = function (classes) {
      return (' ' + classes + ' ').replace(rclass, ' ');
    },

    inClass = function (name, classes) {
      return normClass(classes).indexOf(name) >= 0;
    },

    superdom = {
      superdom: {
        version: '0.0.1',
        noconflict: function (name) { return orig[name]; }
      },

      addClass: function (value) {
        var classes, proceed = 'string' === typeof value && value;

        if ($.isFunction(value)) {
          return this.each(function (j) {
            $(this).addClass(
              value.call(this, j, this.getAttribute('class'))
            );
          });
        }//end if: applied function to each node

        if (!proceed) { return this; }

        classes = value.match(rnotwhite) || [];

        return this.each(function () {
          if (1 !== this.nodeType) { return; } // nothing to do

          var oldClasses = this.getAttribute('class'),
            newClasses = oldClasses ? normClass(oldClasses) : ' ';

          $.each(classes, function (j, className) {
            if (-1 === newClasses.indexOf(' ' + className + ' ')) {
              newClasses += className + ' ';
            }//end if
          });//end $.each class name

          // only change attribute if it's different to avoid re-rendering
          newClasses = $.trim(newClasses);
          if (oldClasses !== newClasses) {
            this.setAttribute('class', newClasses);
          }
          //setClass(this, oldClasses, newClasses); // classes added
        });//end $.each
      },//end: addClass

      removeClass: function (value) {
        var classes, proceed = 0 === arguments.length ||
          ('string' === typeof value && value);

        if ($.isFunction(value)) {
          return this.each(function (j) {
            $(this).removeClass(
              value.call(this, j, this.getAttribute('class'))
            );
          });
        }//end if: applied to each node

        if (!proceed) { return this; }

        classes = value.match(rnotwhite) || [];

        return this.each(function () {
          var oldClasses = this.getAttribute('class'),
            newClasses = oldClasses ? normClass(oldClasses) : '';

          if (1 !== this.nodeType || !newClasses) { return; } //nothing to do
          $.each(classes, function (j, className) {
            className = ' ' + className + ' ';
            while (newClasses.indexOf(className) >= 0) {
              newClasses = newClasses.replace(className, ' ');
            }//end while: all instances of this class name removed
          });//end $.each class name

          // only change attribute if it's different to avoid re-rendering
          newClasses = value ? $.trim(newClasses) : '';
          if (oldClasses !== newClasses) {
            this.setAttribute('class', newClasses);
          }
          //setClass(this, oldClasses, newClasses); // classes removed
        });
      },//end removeClass

      toggleClass: function (value, stateVal) {
        var type = typeof value;

        if ('boolean' === typeof stateVal && 'string' === type) {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }//end if

        if ($.isFunction(value)) {
          return this.each(function (j) {
            $(this).toggleClass(
              value.call(this, j, this.getAttribute('class'), stateVal),
              stateVal
            );
          });
        }//end if: applied to all nodes

        return this.each(function () {
          var classes, newClasses, oldClasses, self = $(this);

          if ('string' === type) {
            // toggle individual class names
            classes = value.match(rnotwhite) || [];

            $.each(classes, function (j, className) {
              return self.hasClass(className) ?
                      self.removeClass(className) :
                      self.addClass(className);
            });//end $.each
          } else if (type === strundefined || 'boolean' === type) {
            // Toggle whole class name
            oldClasses = this.getAttribute('class');
            if (oldClasses) {
              self.data('__className__', oldClasses);
            }//end if: stored the old class name

            /*
             If the element has a class name or if we're passed "false",
             then remove the whole classname (if there was one, the above
             saved it). Otherwise bring back whatever was previously saved
             (if anything), falling back to the empty string if nothing was
             stored.
            */
            this.setAttribute('class', oldClasses ||
                false === value ? '' : self.data('__className__') || ''
              );
          }//end if
        });//$.each
      },//end toggleClass

      hasClass: function (selector) {
        var
          className = ' ' + selector + ' ',
          i = 0, L = this.length;

        for (i = 0; i < L; i += 1) {
          if (1 === this[i].nodeType &&
              inClass(className, this[i].getAttribute('class'))) {
            return true;
          }//end if: checked DOM node
        }//end for

        return false;
      }//end hasClass
    };//end superdom

  // export the plugin
  $.fn.extend(superdom);
  return superdom;
}));
