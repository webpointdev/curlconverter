var util = require('../util')
require('string.prototype.startswith')

var toPython = function (curlCommand) {
  var request = util.parseCurlCommand(curlCommand)
  var cookieDict
  if (request.cookies) {
    cookieDict = 'cookies = {\n'
    for (var cookieName in request.cookies) {
      cookieDict += "    '" + cookieName + "': '" + request.cookies[cookieName] + "',\n"
    }
    cookieDict += '}\n'
  }
  var headerDict
  if (request.headers) {
    headerDict = 'headers = {\n'
    for (var headerName in request.headers) {
      headerDict += "    '" + headerName + "': '" + request.headers[headerName] + "',\n"
    }
    headerDict += '}\n'
  }

  var dataString
  if (request.data) {
    if (request.data.startsWith('@')) {
      var filePath = request.data.slice(1)
      dataString = 'data = open(\'' + filePath + '\')'
    } else {
      dataString = 'data = \'' + request.data + '\'\n'
    }
  }
  var requestLine = 'requests.' + request.method + '(\'' + request.url + '\''
  if (request.headers) {
    requestLine += ', headers=headers'
  }
  if (request.cookies) {
    requestLine += ', cookies=cookies'
  }
  if (request.data) {
    requestLine += ', data=data'
  }
  if (request.insecure) {
    requestLine += ', verify=False'
  }
  requestLine += ')'

  var pythonCode = ''
  if (cookieDict) {
    pythonCode += cookieDict + '\n'
  }
  if (headerDict) {
    pythonCode += headerDict + '\n'
  }
  if (dataString) {
    pythonCode += dataString + '\n'
  }
  pythonCode += requestLine

  return pythonCode
}

module.exports = toPython
