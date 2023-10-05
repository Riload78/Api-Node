const { IncomingWebhook } = require('@slack/webhook')
const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)

const loggerStream = {
  write: message => {
    webhook.send({
      text: message
    })
    // console.info(message)
  }
}

module.exports = loggerStream
