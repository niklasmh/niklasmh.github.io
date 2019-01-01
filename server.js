require('dotenv').config()
var express = require('express')
var app = express()
var blog = require('./blog')

app.use(express.static(__dirname + '/build'))
app.use('/api/v1/blog', express.static(__dirname + '/public/api/v1/blog'))

var listener = app.listen(process.env.PORT || 8080, function() {
  console.log('Listening on http://localhost:' + listener.address().port)
})

// Backup API if static API is not enough in the future
app.get('/api/v0/blog/:post?', function(req, res) {
  var data = null

  if (req.params.post) {
    if (req.params.post === 'all') {
      data = blog.getAllPosts()
    } else {
      data = blog.getPost(req.params.post)
    }
  } else {
    data = blog.getAllPostNames()
  }

  if (data) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(JSON.stringify(data, null, 2))
  } else {
    res.statusCode(404)
  }
})
