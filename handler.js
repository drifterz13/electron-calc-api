require('dotenv').config()
const connectToDatabase = require('./db')
const Calc = require('./model/Calc')
const User = require('./model/User')

module.exports.saveData = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    const parseData = JSON.parse(event.body)
    Calc.create(parseData)
      .then(data => 
        saveToUser(parseData.username, data)
      )
      .then(info => callback(null, {
        statusCode: 200,
        headers: insertHeader(),
        body: JSON.stringify(info)
      }))
      .catch(err => callback(null, {
        statusCode: err.status || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: err.message || 'Cannot save data.'
        })
      }))
  })
}

function saveToUser(username, data) {
  return User.findOne({ username: username ? username : 'anonymous' })
    .then(user => {
      user.calcData.push(data._id)
      return user.save()
    })
    .then(data => data)
}

module.exports.loadAllData = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    User.findOne({ username: event.pathParameters.user })
      .populate('calcData', {
        firstVariable: true,
        secondVariable: true,
        operation: true,
        result: true
      })
      .then(info => callback(null, {
        statusCode: 200,
        headers: insertHeader(),
        body: JSON.stringify(info)
      }))
      .catch(err => callback(null, {
        statusCode: err.status || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: err.message || 'Cannot load data.'
        })
      }))
  })
}

module.exports.loadData = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    Calc.findById(event.pathParameters.id)
      .then(data => callback(null, {
        statusCode: 200,
        headers: insertHeader(),
        body: JSON.stringify(data)
      }))
      .catch(err => callback(null, {
        statusCode: err.status || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: err.message || 'Cannot load data.'
        })
      }))
  })
}


module.exports.register = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    User.create(JSON.parse(event.body))
      .then(user => callback(null, {
        statusCode: 200,
        headers: insertHeader(),
        body: JSON.stringify(user)
      }))
      .catch(err => callback(null, {
        statusCode: err.status || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: 'Invalid credentials'
        })
      }))
  })
}

module.exports.login = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    const { username, password } = JSON.parse(event.body)
    User.findOne({ username })
      .then(user => 
        user.password === password
        ? user
        : Promise.reject(new Error('Invalid password'))
      )
      .then(session => callback(null, {
        statusCode: 200,
        headers: insertHeader(),
        body: JSON.stringify(session)
      }))
      .catch(err => callback(null, {
        statusCode: err.status || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          message: err.message || 'Cannot login.'
        })
      }))
  })
}

function insertHeader() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
  return headers
}
