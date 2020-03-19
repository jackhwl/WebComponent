require('dotenv').config()

exports.handler = (event, _context, callback) => {
    const mailgun = require('mailgun-js')

    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        doamin: process.env.MAILGUN_DOMAIN
    })

    const data = JSON.parse(event.body)

    const email = {
        from: 'Wenlin Huang <whuang@viglobal.com>'
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ boop: true})
    })
}