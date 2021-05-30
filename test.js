const {sankaku_credentials} = require('./config.json');
const axios = require('axios');

const protected_request_url = 'https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&default_threshold=1&hide_posts_in_books=in-larger-tags&limit=40&tags=fav:SauceChef';
const login_url = 'https://capi-v2.sankakucomplex.com/auth/token';
const logout_url = 'https://capi-v2.sankakucomplex.com/auth/logout?lang=en';

// try logging in with credentials
axios.post(login_url, {
  login: sankaku_credentials.username,
  password: sankaku_credentials.password
})
.then((response) => {
  // login successful

  const token_type = response.data.token_type;
  const access_token = response.data.access_token;
  const refresh_token = response.data.refresh_token;

  console.log(`${token_type} ${access_token}` );

  // protected url request
  axios.get(protected_request_url, {
    headers: {
      'Authorization': `${token_type} ${access_token}`,
      'User-Agent': 'Mozilla/5.0'
    }
  })
  .then((response) => {
    console.log('got response!!');
    console.log(response.data);
  })
  .catch((error => {
    console.log('error handling request');
    console.log({
      url: error.config.url,
      method: error.config.method,
      headers: error.config.headers,
    });
  }));
})
.catch((error => {
  console.log('login failed');
  //console.log(error.message);
}))
