const { prefix } = require('../config.json');
const sankChanApi = require('../sankaku-channel-util/sank-chan-requester.js');

module.exports = {
  name: 'dr',
  description: 'Make a dynamic request to sankaku channel.',
  execute (message, args) {
    sankChanApi.requestSankImagesDynamically({
      lang: 'en',
      limit: 10,
      hide_posts_in_books: 'in-larger-tags',
      default_threshold: 1,
      tags: 'rating:safe+nekomimi',
      page: 2
    })
      .then(result => {
        const imagePaths = result
          .filter((image, it) => it < 3)
          .map(image => (image.sample_url));
          message.channel.send('', { files: imagePaths });
      })
  }
};
