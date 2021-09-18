const { SauceJob, buildExample } = require("../persistence/sauce-job");
const SankRequester = require("../sankaku-channel-util/sank-requester-v2");

function runJob(client, sauce_job) {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - sauce_job.days_to_check);
  console.log({date: minDate});
  SankRequester.getPostsInInterval(sauce_job.tags, minDate, maxDate, sauce_job.limit)
  .then(result => {
    console.log(result);
    const message = result.map((p) => p.id).join(', ');
    client.channels.fetch(sauce_job.channel)
    .then(ch => {
      console.log(ch)
      ch.send(message);
    });
  });
}

module.exports = {
  name: 'test',
  description: 'A test command for fast development.',
  guildOnly: true,
  execute (message, args) {
    runJob(message.client, buildExample());

    message.channel.send('> test command executed');
  }
};
