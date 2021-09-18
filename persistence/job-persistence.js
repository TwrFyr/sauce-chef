const config = require('../config.json');
const DataStore = require('nedb');

let db;

// inits the database, can be called multiple times without consequences
const safeInitDb = () => {
  if (!db) {
    db = new DataStore({ filename: config.database_path });
    db.ensureIndex({ fieldName: 'id', unique: true });
    db.loadDatabase();
  }
}

module.exports.getJob = (id) => {
  safeInitDb();
  db.find({ _id: id }, (err, doc) => {
    if (err) {
      console.error(err);
      return undefined;
    }
    return doc;
  });
}

module.exports.getJobsForChannel = (channelId) => {
  safeInitDb();
  db.find({channel_id: channelId},  (err, docs) => {
    if (err) {
      console.error(err);
      return undefined;
    }
    return docs;
  });
}

module.exports.getAllJobs = () => {
  safeInitDb();
  db.find({}, (err, docs) => {
    if (err) {
      console.error(err);
      return [];
    }
    return docs;
  });
}

// persists the job, assumes it is a new job
module.exports.saveNewJob = (sauceJob) => {
  safeInitDb();
  db.insert(sauceJob);
}

// deletes the job, either using the job's _id property or job as the id itself
module.exports.deleteJob = (job) => {
  safeInitDb();
  const deleteId = job._id ? job._id : job;
  db.remove({_id: deleteId})
}
