console.log('Prod database key');
module.exports = {
  mongoURI: process.env.MONGO_URI,
  dbName: 'tadoo_prod'
}
