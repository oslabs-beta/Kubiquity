const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const errorSchema = new Schema({
  namespace: {
    required: true,
    type: String
  },
  lastSeen: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  reason: {
    required: true,
    type: String
  },
  object: {
    required: true,
    type: String
  },
  message: {
    required: true,
    type: String
  },
}, {
  timestamps: true,
})

const Error = mongoose.model('error', errorSchema);

module.exports = Error;