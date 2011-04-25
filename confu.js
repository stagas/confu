// confu by stagas

var fs = require('fs')
  , path = require('path')
  , Hash = require('hashish')

module.exports = function() {
  var args = [].slice.call(arguments)
  
  // normalize config path
  configPath = path.join.apply(this, args)
  
  // extract root
  var rootPath = path.dirname(configPath)
  
  // parse config
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  
  if (config.paths) {
    // get paths relative to root
    config.paths = Hash.map(config.paths, function(pathName) {
      return pathName[0] !== '/' ? path.join(rootPath, pathName) : pathName
    })
  } else config.paths = {}
  
  // convenience
  config.paths.root = rootPath
  config.paths.config = configPath
  
  return config
}