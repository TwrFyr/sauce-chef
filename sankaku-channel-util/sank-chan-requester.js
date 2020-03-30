const axios = require('axios')

const exampleUrl = 'https://capi-v2.sankakucomplex.com/posts?lang=en&page=2&limit=10&hide_posts_in_books=in-larger-tags&default_threshold=1&tags=rating:safe+nekomimi'
const requestBaseUrl = 'https://capi-v2.sankakucomplex.com/posts'

const imageType = 'image';

class DeflatedSankImage {
  constructor (jsonObject) {
    this.id = jsonObject.id;
    this.rating = jsonObject.rating;
    this.type = jsonObject.file_type;

    this.sample_url = jsonObject.sample_url;
    this.sample_width = jsonObject.sample_width;
    this.sample_height = jsonObject.sample_height;

    this.file_url = jsonObject.file_url;
    this.width = jsonObject.width;
    this.height = jsonObject.height;
  }
}

exports.requestExampleSankImages = () => { 
  return axios.get(exampleUrl)
  .then(response => 
    response.data
      .map(obj => new DeflatedSankImage(obj))
      .filter(obj => obj.type.startsWith(imageType))
  )
  .catch(error => {
    console.log(error);
  });
}

exports.requestSankImagesDynamically = (params) => { 
  return axios.get(`${requestBaseUrl}?tags=${params.tags}`, {
    params: {
      lang: 'en',
      page: '1',
      limit: '5',
      hide_posts_in_books: 'in-larger-tags',
      default_threshold: '1',
    }
  })
  .then(response => 
    response.data
      .map(obj => new DeflatedSankImage(obj))
      .filter(obj => obj.type.startsWith(imageType))
  )
  .catch(error => {
    console.log(error);
  });
}