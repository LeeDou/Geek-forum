var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title:{
		type:String,
		unique:true
	},
	essayText:String,
	author:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

ArticleSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		meta.updateAt = Date.now()
	}
	
	next();	
});

ArticleSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(id,cb){
		return this
		.find({title,id})
		.exec(cb)
	}
};

module.exports = ArticleSchema;