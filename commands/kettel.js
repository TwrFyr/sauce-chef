const { prefix } = require('../config.json');
const sankChanApi = require('../sankaku-channel-util/sank-chan-requester.js');
const embeds = require('../embeds/kettel');
const { SauceJob } = require('../persistence/sauce-job')
const cronValidator = require('cron-validator')

const timeout = 300000;

const handleCreateJob = (message) => {
  message.channel.send({embed: embeds.getAddEmbed1()});

  const sauceJob = new SauceJob();
  // todo: set guild and channel id

  const filter = reponse => reponse.author.id === message.author.id;

  // get tags
  message.channel.awaitMessages(filter, {max: 1, time: timeout})
    .then(collected => {
      const response = collected.first();
      if (response.content === 'exit') {
        respondWithAbort(message);
        return;
      } 
      // todo: clean tags 
      sauceJob.tags = response.content.split(' ');
      message.channel.send({embed: embeds.getAddEmbed2(sauceJob)});

      // get cron job pattern
      message.channel.awaitMessages(filter, {max: 1, time: timeout})
      .then(collected => {
        const response = collected.first();
        if (response.content === 'exit') {
          respondWithAbort(message);
          return;
        } 

        if (!cronValidator.isValidCron(response.content)) {
          // todo change to loop
          respondWithError(message);
          return;
        }
        sauceJob.cron_pattern = response.content;
        message.channel.send({embed: embeds.getAddEmbed3(sauceJob)});

        // get manual validation
        message.channel.awaitMessages(filter, {max: 1, time: timeout})
        .then(collected => {
          const response = collected.first();
          if (response.content === 'exit') {
            respondWithAbort(message);
            return;
          }
          if (response.content === 'verify') {
            message.channel.send({embed: embeds.getAddEmbed4(sauceJob)});
          } else {
            respondWithAbort(message);
            return;
          }
        });
      });
    })
    .catch(error => {
      console.error(error);
      message.channel.send("You didn't respond in time, the add operation was aborted.");
    })
}

const handleDeleteJob = (message) => {
  console.log('handleDeleteJob not implemented yet');
}

const handleListJobs = () => {
  console.log('handleListJobs not implemented yet');
}

const respondWithError = (message) => {
  // todo: have more detailed message for user about how to get help
  message.channel.send('Command usage invalid, try the help command.');
}

const respondWithAbort = (message) => {
  // todo: have more detailed message for user about how to get help
  message.channel.send('You have stopped the adding process.');
}

module.exports = {
  name: 'kettel',
  description: 'Shows all scheduled requests for the current channel. `new` walks you through creating a new job and adds it to this channel. `remove <index>` deletes the job with the given index.',
  usage: '[new | remove <index>]',
  guildOnly: true,
  execute (message, args) {
    if (args.length === 0) {
      handleListJobs();
    } else if (args.length === 1 && args[0] === 'new') {
      handleCreateJob(message);
    } else if (args.length === 2 && args[0] === 'remove' && !isNaN(+args[1])) {
      handleDeleteJob();
    } else {
      respondWithError(message);
    }
  }
};
