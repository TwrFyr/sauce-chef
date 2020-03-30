const { prefix } = require('../config.json');
const sankChanApi = require('../sankaku-channel-util/sank-chan-requester.js');

module.exports = {
  name: 'dr',
  description: 'Make a dynamic request to sankaku channel.',
  usage: '[file | -] [<tag1> <tag2> ...]',
  execute (message, args) {
    if (args.length === 0 || args[0] === '-') {
      args.splice(0, 1);
      sankChanApi.requestSankImagesDynamically(1, 5, args)
      .then(result => {
        const imagePaths = result
          .filter((image, it) => it < 3)
          .map(image => (image.sample_url))
          .forEach(element => {
            message.channel.send(`${element}`);
          });;
          
      });
    } else if (args[0] === 'file') {
      args.splice(0, 1);
      sankChanApi.requestSankImagesDynamically(1, 5, args)
      .then(result => {
        const imagePaths = result
          .filter((image, it) => it < 3)
          .map(image => (image.sample_url));
          message.channel.send('', { files: imagePaths });
      });
    } else {
      message.channel.send(`Invalid command. Please check the syntax by typing ${prefix}help [command]`);
    }
  }
};
