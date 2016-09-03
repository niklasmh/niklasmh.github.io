/**
 * This file will load all scripts needed in dev mode.
 */

(function () {
  var local = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  var entry = document.querySelector('head')
  var scripts = {
    'less': {
        local: 'node_modules/less/dist/less.js',
        public: '//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.1/less.min.js'
    }
  }

  for (var ref in scripts) {
    var script = document.createElement('script')
    script.src = local ? scripts[ref].local : scripts[ref].public
    entry.appendChild(script)
  }
}())
