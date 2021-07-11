'use strict';

module.exports = function(grunt) {

  var libInfo = grunt.file.readJSON('package.json');

  var version = require('./lib/version.js');

  grunt.loadTasks('lib');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: libInfo,

    clean: ['dist', 'coverage'],

    uglify: {
      mainBuild: {
        files: {
          'dist/helpers.min.js': ['dist/helpers.js']
        }
      }
    },

    writeVersion: {
      versionJSON: {
        srcFile: JSON.stringify(version),
        variable: 'version',
        dest: 'src/version.js'
      }
    },


    eslint: {
      options: {
        configFile: 'conf/eslint.json'
      },
      src: ['src/helpers.js']
    },

    browserify: {
      dist: {
        files: {
          'dist/helpers.js': ['src/main.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'Helper'
          },
          transform: [
              ['babelify', {
                presets: ['es2015']
              }]
           ]
        }
      }
    },

    comments: {
      dist: {
        options: {
            singleline: true,
            multiline: true
        },
        src: [ 'dist/*.js']
      },
    },

    watch: {
      js: {
        files: 'src/**/*.js',
        tasks: ['eslint', 'browserify', 'comments']
      }
    }

  });

  // Load all of Grunt's dependencies
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['clean', 'writeVersion', 'eslint', 'browserify', 'comments', 'watch']);

  grunt.registerTask('build', ['clean', 'writeVersion', 'eslint', 'browserify', 'comments', 'uglify']);



};