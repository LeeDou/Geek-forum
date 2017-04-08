var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	content:String,
	cTitle:String,
	cAuthor:String,
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

CommentSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		meta.updateAt = Date.now()
	}
	
	next();	
});

CommentSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(_id,cb){
		return this
		.findOne({id,_id})
		.exec(cb)
	}
};

module.exports = CommentSchema;