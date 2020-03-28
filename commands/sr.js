const { prefix } = require('../config.json');
const { requestExampleSankImages: requestSankImages } = require('../sankaku-channel-util/sank-chan-requester.js');

module.exports = {
  name: 'sr',
  description: 'Makes a static request to sankaku channel and returns the first 3 images of said request.',
  execute (message, args) {
    requestSankImages()
      .then(result => {
        const imagePaths = result
          .filter((image, it) => it < 3)
          .map(image => (image.file_url));
          message.channel.send('', { files: imagePaths });
      })
  }
};
