const axios = require('axios')
require('dotenv').config();

function errorlog(contentString) {
    axios.post(process.env.WEBHOOK, {
      "content":contentString
       })
      .then()
      .catch(err => console.error(err));
  }

exports.errorlog = errorlog;