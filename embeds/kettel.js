// creates embeds for adding a new job
const { buildRequestUrl } = require('../sankaku-channel-util/sank-requester-v2')

const getAddEmbedBase = () => {
  return {
    color: 0xb300b3,
    title: 'Adding Sauce Job',
    footer: {
      text: 'You can cancel this operation by typing \'exit\'.',
    },
  }
}

module.exports.getAddEmbed1 = () => {
  const embed = getAddEmbedBase();
  
  // todo: Add mention to current user
  embed.description = 'Step 1/4\nYou are trying to create a new job.';
  embed.fields = [
    {
      name: 'Next step',
      value: 'Please enter the tags for the Sauce Job seperated by spaces (the same way as in old sankaku).',
    },
  ];
  return embed;
}

module.exports.getAddEmbed2 = (sauceJob) => {
  const embed = getAddEmbedBase();

  embed.description = 'Step 2/4';
  embed.fields = [
    {
      name: 'Added tags',
      value: sauceJob.tags
                .sort((a, b) => a.localeCompare(b))
                .map(tag => `- \`${tag}\``)
                .join('\n'),
    },
    {
      name: 'Next step',
      value: 'Please enter the [cron job pattern](https://support.acquia.com/hc/en-us/articles/360004224494-Cron-time-string-format).',
    },
  ];
  return embed;
}

module.exports.getAddEmbed3 = (sauceJob) => {
  const embed = getAddEmbedBase();
  
  embed.description = 'Step 3/4';
  embed.fields = [
    {
      name: 'Added tags',
      value: sauceJob.tags
                .sort((a, b) => a.localeCompare(b))
                .map(tag => `- \`${tag}\``)
                .join('\n'),
    },
    {
      name: 'Cron pattern',
      value: sauceJob.cron_pattern,
    },
    {
      name: 'Next step',
      // todo: build link to actual sankaku site, not api
      value: `Please verify that the following link is giving you the expected results:\n[Request Link](${buildRequestUrl(sauceJob.tags, 20)})\n\nAnswer with \`verify\` if the result looks good.`,
    },
  ];
  return embed;
}

module.exports.getAddEmbed4 = (sauceJob) => {
  const embed = getAddEmbedBase();
  
  embed.description = 'Step 4/4\n\nThe job has been created successfully :)';
  embed.fields = [
    {
      name: 'Added tags',
      value: sauceJob.tags
                .sort((a, b) => a.localeCompare(b))
                .map(tag => `- \`${tag}\``)
                .join('\n'),
    },
    {
      name: 'Cron pattern',
      value: sauceJob.cron_pattern,
    },
  ];
  return embed;
}