const { requestSankImages } =  require('./sank-chan-requester.js');

requestSankImages()
  .then(response => {
    lecckomio(response)
  })

function lecckomio(lol) {
  console.log(lol);
}
