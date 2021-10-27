const urlExists = require('url-exists')

urlExists('https://github.com/AemieJ', function (err, exists) {
  console.log(err)
  console.log(exists) // true
})
