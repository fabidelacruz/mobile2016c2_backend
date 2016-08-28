var winston = require('winston');

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://mberetta.com.ar:27017/mobile2016c2';

var replyError = function(res){
	res.json({error:true});
};

module.exports = {
	
	processService: function(res, task){
		MongoClient.connect(url, function (err, db) {
			if (err) {
				winston.info('Unable to connect to the mongoDB server. Error: ' + err);
				replyError(res);
			} else {
				winston.info('Connection established to ' + url);
				task(db);
				db.close(function(err, result){
					winston.info("Connection closed");
				});
			}
		});
	},
	
	replyError: replyError,
	
	emptyArrayOrProperty: function(docs, propName){
		return docs.length > 0 ? docs[0][propName] : [];
	}
	
};