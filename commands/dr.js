const { prefix } = require('../config.json');
const sankChanApi = require('../sankaku-channel-util/sank-chan-requester.js');

module.exports = {
  name: 'dr',
  description: 'Make a dynamic request to sankaku channel.',
  usage: '[file | -] [<tag1> <tag2> ...]',
  execute (message, args) {
    const limitTag = args.filter((tag) => tag.split(':')[0] === 'limit').map(arg => {
      return {
        tag: arg.split(':')[0],
        val: arg.split(':')[1]
      };
    });
    let limit = 3;
    if (limitTag.length !== 0) {
      limit = parseInt(limitTag[0].val);
      if (limit === NaN)
        limit = 3;
    }
    sankChanApi.requestSankImagesDynamically(1, limit, args)
    .then(result => {
      const imagePaths = result
        .map(image => (image.sample_url));
        message.channel.send('', { files: imagePaths });
    });
  }
};
