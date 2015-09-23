// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // check all js files for errors
    jshint: {
      all: ['*.js', 'routes/*.js', 'public/js/**/*.js'] 
    },

    // watch js files and process the above tasks
    watch: {
      js: {
        files: ['*.js', 'routes/*.js', 'public/js/**/*.js'],
        tasks: ['jshint']
      }
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          nodeArgs: ['--debug']
        }
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }  

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['jshint', 'concurrent']);

};