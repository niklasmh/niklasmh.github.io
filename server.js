require('dotenv').config()
var express = require('express')
var app = express()

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.listen(process.env.PORT || 8080)

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
