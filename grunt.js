module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      all: ['jquery.tristate.js']
    },
    jshint: {
      options: {
        browser: true,
        boss: true
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'jquery.tristate.js'],
        dest: 'jquery.tristate.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint min');

};