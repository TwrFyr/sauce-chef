const { requestSankImages } =  require('./sank-chan-requester.js');

requestSankImages()
  .then(response => {
    console.log(response)
  })
  