var fs = require('fs')
var fm = require('front-matter')
var commonmark = require('commonmark')
var reader = new commonmark.Parser()
var writer = new commonmark.HtmlRenderer()

var articles = []
fs.readdirSync('./blog').forEach(file => {
  var post = fm(fs.readFileSync(__dirname + '/blog/' + file) + '')
  var content = writer.render(reader.parse(post.body))

  articles.push({
    authors: post.attributes.author.split(/\s*[,&]\s*/),
    content: content,
    date: post.attributes.date.toISOString(),
    description: rmMdLinks(post.body.split(/\n/)[0]),
    link: slugify(file),
    title: post.attributes.title
  })
})

function getAllPosts () {
  return fs.readdirSync('./blog')
    .filter(post => /\.md$|\.markdown$/.test(post))
    .map(slugify)
}

function getPost (postName) {
  var files = fs.readdirSync('./blog')
    .filter(file => new RegExp(postName, 'i').test(file))
  var pathToPost = __dirname + '/blog/' + (files[0] || '')

  if (fileExists(pathToPost) && files.length) {
    var postData = fm(fs.readFileSync(pathToPost) + '')
    postData['file'] = files[0]
    postData['link'] = slugify(files[0])

    return postData
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
  return str.replace(/\]\([^\)]*\)/g, ']').replace(/!?\[([^\]]*)\]/g, '$1')
}

function pascalCase (str) {
  return str.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
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
    getPost: getPost
}
