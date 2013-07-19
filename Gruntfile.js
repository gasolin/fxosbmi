module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: {
      generate: {
        options: {
          basePath: "./public/",
          // cache: ["js/app.js", "css/style.css"],
          // cachePrefix: "",
          // network: ["http://*", "https://*"],
          // fallback: ["/ /offline.html"],
          // exclude: ["js/jquery.min.js"],
          // preferOnline: true,
          verbose: false,
          timestamp: true
        },
        src: [
            "*.html",
            "js/*.js",
            "style/*.css",
            "style/icons/*.ico",
            "style/icons/*.png",
            "style/images/*.png",
            "style/images/*.jpg",
            'style/icons/*.ico',
            "style_unstable/*.css",
            "style_unstable/images/*.png",
            "style_unstable/images/*.jpg",
            "style/**/images/ui/*.png",
            "style/**/images/icons/*.png",
            "lib/font-awesome/css/*.css",
            "lib/font-awesome/font/*.*"
        ],
        dest: "public/manifest.appcache"
      }
    }
  });

  grunt.loadNpmTasks('grunt-manifest');

  // Default task(s).
  grunt.registerTask('default', ['manifest']);

};
