const express = require('express')
const fs = require('fs')
const sqlite = require('sql.js')
const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3')
const nodemailer = require('nodemailer')

const db = new sqlite.Database(filebuffer)

const app = express()

const path = require('path')
var mailOptions
app.set('port', (process.env.PORT || 3001))

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'client/build', 'index.html'))
})
app.get('/contact', (req, res) => {
  const name = req.query.name
  const mail = req.query.mail
  const body = req.query.body
 
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: { rejectUnauthorized: false },
    auth: {
      user: 'almamutsite@gmail.com',
      pass: 'falafelsite17'
    }
  })

  mailOptions = {
    from: mail,
    to: 'contacto@almamut.com',
    subject: 'Mail from '+name+'. (almamut.com)',
    text: body
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })


  return res.json({
    success: true
  })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`)
})