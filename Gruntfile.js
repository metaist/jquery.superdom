module.exports = function (grunt) {
  'use strict';
  var path = require('path');

  var pkg = grunt.file.readJSON('package.json'),
      names = {
        src: 'jquery.' + pkg.name,
        pluginpkg: pkg.name + '.jquery'
      };

  grunt.initConfig({
    pkg: pkg,
    names: names,
    banner:
      '/*! <%= pkg.title %> v<%= pkg.version %> | ' +
      '(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | ' +
      '<%= pkg.licenses[0].url %> */',

    /* Clean */
    clean: ['dist', names.pluginpkg + '.json', names.src + '-*.zip'],

    /* Concat */
    concat: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= names.src %>.js'],
        dest: 'dist/<%= names.src %>.js',
        options: {
          process: function (txt, src) {
            return txt.replace(/@VER/g, pkg.version);
          }
        }
      },
    },

    /* JSON Lint */
    jsonlint: {
      all: {
        src: ['package.json', '<%=names.pluginpkg %>.json']
      }
    },

    /* JSHint */
    jshint: {
			all: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
      options: { jshintrc: true }
    },

    /* QUnit */
    qunit: {
      all: ['test/**/*.html']
    },

    /* Compress */
    compress: {
      main: {
        options: {
          archive: [names.src, pkg.version].join('-') + '.zip'
        },
        expand: true,
        flatten: true,
        src: ['README.md', 'dist/**'],
        dest: './' + [names.src, pkg.version].join('-')
      }
    },
    /* Uglify */
    uglify: {
      all: {
        files: {
          'dist/<%= names.src %>.min.js':
            ['dist/<%= names.src %>.js']
        },
      },
      options: {
        preserveComments: false,
        sourceMap: 'dist/<%= names.src %>.min.map',
        sourceMappingURL: '<%= names.src %>.min.map',
        report: 'min',
        beautify: { ascii_only: true },
        banner: '<%= banner %>',
        compress: {
          drop_console: true,
          hoist_funs: false,
          loops: false,
          unused: false
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt); // load grunt tasks

  grunt.registerTask('default', ['build', 'test', 'package']);
  grunt.registerTask('build', ['clean', 'jqpackage', 'concat']);
  grunt.registerTask('test', ['jsonlint', 'jshint', 'qunit']);
  grunt.registerTask('package', ['uglify', 'compress']);

  grunt.registerTask('jqpackage', function () {
    var filename = names.pluginpkg + '.json',
        props = pkg,
        out = {};

    Object.keys(pkg).forEach(function (prop) {
      if (prop !== 'scripts') { out[prop] = props[prop]; }
    });

    // Write file.
    grunt.verbose.or.write('Writing ' + filename + '...');
    try {
      grunt.file.write(path.join(process.cwd(), filename), JSON.stringify(out, null, 2));
      grunt.verbose.or.ok();
    } catch(e) {
      grunt.verbose.or.error().error(e);
      throw e;
    }
  });
};
