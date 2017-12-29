require('dotenv').config()
var express = require('express')
var app = express()

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/static', express.static(__dirname + '/static'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use(express.static(__dirname + '/build'))

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on http://localhost:' + listener.address().port)
})
