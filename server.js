require('dotenv').config()
var express = require('express')
var app = express()
var blog = require('./blog')

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/static', express.static(__dirname + '/static'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(express.static(__dirname + '/build'))

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on http://localhost:' + listener.address().port)
})

app.get('/api/v1/blog/:post?', function (req, res) {
  var data = null

  if (req.params.post) {
    data = blog.getPost(req.params.post)
  } else {
    data = blog.getAllPosts()
  }

  if (data) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.send(JSON.stringify(data, null, 2))
  } else {
    res.statusCode(404)
  }
})
