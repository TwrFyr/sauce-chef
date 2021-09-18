const base_url = 'https://capi-v2.sankakucomplex.com/posts/keyset'
const default_params = 'lang=en&default_threshold=1&hide_posts_in_books=in-larger-tags';

const axios = require('axios');
const {SankakuPost} = require('./types.js');

// formats a date to 'dd.MM.yyyy'
function _toSankakuDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`
}
module.exports.toSankakuDate = _toSankakuDate;

// build request url
function _buildRequestUrl(tags, limit) {
  const tagsString = tags ? `&tags=${tags.join('+')}` : '';
  return `${base_url}?${default_params}&limit=${limit}${tagsString}`;
}
module.exports.buildRequestUrl = _buildRequestUrl;

// gets the SankakuPosts queried using the given tags and the limit
const _getPosts = (tags, limit = 40) => {
  const request_url = _buildRequestUrl(tags, limit);

  // call api
  return axios.get(request_url)
  .then((response) => {
    if (response.status != 200) {
      console.log(`an error occurred (${response.status}) when calling the api`);
      // todo: proper error handling
      return response;
    }
    return response.data.data.map(raw_post => new SankakuPost(raw_post));
  })
  .catch(function (error) {
    // todo: proper error handling
    console.log(`an error occurred when calling the api`);
    console.log(error)
    return null;
  })
}
module.exports.getPosts = _getPosts;

// gets #limit posts with the given tags uploaded between inclusive minData and maxDate
const _getPostsInInterval = (tags, minDate, maxDate, limit = 40) => {
  tags.push(`date:${_toSankakuDate(minDate)}..${_toSankakuDate(maxDate)}`);
  return _getPosts(tags, limit);
}
module.exports.getPostsInInterval = _getPostsInInterval;