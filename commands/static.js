const { prefix } = require('../config.json');
const sank_requester = require('../sankaku-channel-util/sank-requester-v2.js');

module.exports = {
  name: 'static',
  description: 'A test command for a static sankaku request.',
  guildOnly: true,
  execute (message, args) {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

    tags = ['order:quality', 'nekomimi', '-file_type:video'];
    sank_requester.getPostsInInterval(tags, oneWeekAgo, yesterday, 10)
    .then(result => {
      message.channel.send(`Here are the ${result.length} best nekomimi images of last week (${sank_requester.toSankakuDate(oneWeekAgo)}-${sank_requester.toSankakuDate(yesterday)}):`, {
        files: result.map(sankakuPost => sankakuPost.preview.url)
      });
    });
  }
};
