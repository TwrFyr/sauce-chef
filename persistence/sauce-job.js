class SauceJob {
  constructor () {
    this.guild_id = '';
    this.channel_id = '';

    this.cron_pattern = '';
    this.tags = [];
    this.days_to_check = 0;
    this.limit = 0;

    this.created_at = 0;
  }
}

module.exports.SauceJob = SauceJob;

module.exports.buildExample = () => {
  let job = new SauceJob();

  job.guild_id = '480332233098526721';
  job.channel_id = '690921001537503273';
  // executes every 15s
  job.cron_pattern = '0,15,30,45 * * * * *'
  job.tags = ['nekomimi', 'rating:safe', 'collar']
  job.days_to_check = 1;
  job.limit = 2;
  job.created_at = Date.now();

  return job;
}