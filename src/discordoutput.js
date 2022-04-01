const axios = require('axios')
var URL = "https://discord.com/api/webhooks/957632219558584400/Xhb2Qk4U73f8PfnRhoc7b6b6j-fNtbrccJxxahzq0sYrYwffOrkvjo6cLTXtlydzetT-";

function errorlog(contentString) {
    axios.post(URL, {
      "content":contentString
       })
      .then()
      .catch(err => console.error(err));
  }

exports.errorlog = errorlog;