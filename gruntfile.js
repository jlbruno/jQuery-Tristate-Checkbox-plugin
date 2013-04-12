module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        options: {
          browser: true,
          boss: true
        },
        gruntfile: {
            src: 'gruntfile.js'
        },
        js: {
            src: ['jquery.tristate.js']
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.overrides.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */ \n',
        mangle: true
      },
      build: {
        src: 'jquery.tristate.js',
        dest: 'jquery.tristate.min.js'
      }
    },
    jquerymanifest: {
        options: {
            source: '<%= pkg %>',
            overrides: '<%= pkg.overrides %>'
        }
    }
  });


  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jquerymanifest');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'jquerymanifest']);

};