var fs = require('fs')
var fm = require('front-matter')
var commonmark = require('commonmark')
var reader = new commonmark.Parser()
var writer = new commonmark.HtmlRenderer()

var posts = []
var postPointers = {}
fs.readdirSync('./blog').forEach(file => {
  var data = fm(fs.readFileSync(__dirname + '/blog/' + file) + '')

  var post = {
    attributes: data.attributes,
    authors: data.attributes.author.split(/\s*[,&]\s*/),
    content: writer.render(reader.parse(data.body)),
    date: data.attributes.date.toISOString(),
    description: rmMdLinks(data.body.split(/\n/)[0]),
    file: file,
    link: slugify(file),
    title: data.attributes.title
  }

  postPointers[slugify(file)] = post
  posts.push(post)
})

function getAllPostNames () {
  return fs
  .readdirSync('./blog')
  .filter(post => /\.md$|\.markdown$/.test(post))
  .map(slugify)
}

function getAllPosts () {
  return posts
}

function getPost (postName) {
  if (slugify(postName) in postPointers) {
    return postPointers[slugify(postName)]
  }

  return null
}

function slugify (postName) {
  return postName
  .toLowerCase()
  .replace(/\.md$|\.markdown$/, '')
  .replace(/[^0-9a-z\-]/g, '')
  .replace(/ /g, '-')
}

function rmMdLinks (str) {
  return str
  .replace(/\]\([^\)]*\)/g, ']')
  .replace(/!?\[([^\]]*)\]/g, '$1')
}

function pascalCase (str) {
  return str
  .split(' ')
  .map(word => {
    var head = word.slice(0, 1).toUpperCase()
    var tail = word.slice(1).toLowerCase()
    return head + tail
  })
  .join(' ')
}

function fileExists (filePath) {
  try {
    var exists = fs.statSync(filePath)
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
    slugify: slugify,
    rmMdLinks: rmMdLinks,
    pascalCase: pascalCase,
    getAllPosts: getAllPosts,
    getAllPostNames: getAllPostNames,
    getPost: getPost
}
