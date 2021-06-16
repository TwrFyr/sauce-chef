const { prefix } = require('../config.json');
const sankChanApi = require('../sankaku-channel-util/sank-chan-requester.js');

const handleCreateJob = () => {
  console.log('handleCreateJob not implemented yet');
}

const handleDeleteJob = () => {
  console.log('handleDeleteJob not implemented yet');
}

const handleListJobs = () => {
  console.log('handleListJobs not implemented yet');
}

const respondWithError = (message) => {
  // todo: have more detailed message for user about how to get help
  message.channel.send('Command usage invalid, try the help command.');
}

module.exports = {
  name: 'kettel',
  description: 'Shows all scheduled requests for the current channel. `new` walks you through creating a new job and adds it to this channel. `remove <index>` deletes the job with the given index.',
  usage: '[new | remove <index>]',
  execute (message, args) {
    if (args.length === 0) {
      handleListJobs();
    } else if (args.length === 1 && args[0] === 'new') {
      handleCreateJob();
    } else if (args.length === 2 && args[0] === 'remove' && !isNaN(+args[1])) {
      handleDeleteJob();
    } else {
      respondWithError(message);
    }
  }
};


