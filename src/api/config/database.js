const mongoose = require('mongoose');

async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI || process.env.CONNECTIONSTRING;

  if (!mongoUri) {
    throw new Error('Set MONGO_URI or CONNECTIONSTRING in your .env file.');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
}

module.exports = connectDatabase;
