const MongoClient = require('mongodb').MongoClient;

const mongoUri = 'mongodb+srv://benjamin:benjamin@mirabelle-tpfpe.gcp.mongodb.net/test?retryWrites=true';
module.exports = new MongoClient(mongoUri, { useNewUrlParser: true });
