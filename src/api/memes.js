const axios = require('axios')
var URL = "https://meme-api.com/gimme";

function memeget() {
    return axios.get(URL)
      .then(response => response.data)
      .catch(err => console.error(err))
  };

module.exports.memeget = memeget;