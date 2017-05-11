module.exports = function(grunt){
	grunt.initConfig
	grunt.loadNpmTask('grunt-contrib-watch')
	grunt.loadNpmTask('grunt-nodemon')
	grunt.loadNpmTask('grunt-concurrent')

	grunt.option('force',true)

}