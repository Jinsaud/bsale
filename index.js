const webpack = require('webpack')
const fetch = require('node-fetch')
const config = require('./webpack.config')

const [env] = process.argv.filter(arg => /^(development|production)$/.test(arg))
const prod = env === 'production'
const compiler = webpack(config(env))

async function sendToS3(file, name) {
  try {
    const url = prod
      ? 'http://ec2-52-53-177-133.us-west-1.compute.amazonaws.com:9595/v1/uploader.json'
      : 'http://ec2-52-53-177-133.us-west-1.compute.amazonaws.com:9595/v1/uploader.json'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parameters: {
          body: file,
          content_type: 'js'
        },
        buck: prod ? 'bsalemarket' : 'bprueba',
        bucket_folder: 'market',
        basename: name,
        content_encoding: 'js'
      })
    }
    const res = await fetch(url, options)
    const { success, data } = await res.json()
    if (success) {
      console.log('\x1b[32m%s\x1b[0m', `File ready at: ${data.url}`)
    }
    else {
      throw new Error('Error when uploading the file')
    }
  }
  catch (error) {
    console.log('\x1b[31m%s\x1b[0m', error.message)
  }
}

if (!prod) {
  const options = {
    aggregateTimeout: 300,
    poll: undefined
  }
  compiler.watch(options, (error, stats) => {
    console.log(stats.toString({ colors: true }))
    sendToS3(stats.compilation.assets['Bsale.js'].children[0]._value, 'Bsale.js')
    sendToS3(stats.compilation.assets['Bsale.js.map']._value, 'Bsale.js.map')
  })
}
else {
  compiler.run((error, stats) => {
    console.log(stats.toString({ colors: true }))
    sendToS3(stats.compilation.assets['Bsale.js']._value, 'Bsale.js')
    // TO DO: update templates version
  })
}
