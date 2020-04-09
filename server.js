var express = require('express')
var app = express()
var ParseServer = require('parse-server').ParseServer
var api = new ParseServer({
    serverURL: 'http://localhost:3000/api/',
    databaseURI: 'mongodb://localhost:27017',
    cloud: './cloud/main.js',
    appId: 'myAppId',
    masterKey: 'mykey101',
    restAPIKey: 'restKey102',
    javascriptKey: 'jsKey103'
  });

app.use('/api', api)

app.listen(3000, () => {
    console.log('server start at port 3000')
})