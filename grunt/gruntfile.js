module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Compass SCSS
		 */
		 compass: {
		 	dist: {
		 		options: {
		 			options: 'config.rb',
		 			environment: 'production'
		 		}
		 	},
		 	dev: {
		 		options: {
		 			options: 'config.rb',
		 			environment: 'development'
		 		}
		 	}
		 },


		/**
		 * Autoprefixer
		 * Does not run in watcher.
		 */
		autoprefixer: {
			dist: {
				options: {
					browsers: ['last 4 version', 'ie 8', 'ie 9']
				},
				src: '../css/style.css',
				dest: '../css/style.css'
			}
		},


		/**
		 * Jade
		 */
		jade: {
			dist: {
				options: {
					pretty: true,
				},
				files: {
					'../index.html' : ['../jade/index.jade']
				}
			}
		},


		/**
		 * File watcher
		 */
		watch: {
			/*css: {
				files: ['../scss/*.scss'],
				tasks: ['compass:dev']
			},*/
			jade: {
				files: ['../jade/index.jade'],
				tasks: ['jade:dist']
			}
		}
	});



	/**
	 * Load modules that we'll use
	 */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-autoprefixer');
};