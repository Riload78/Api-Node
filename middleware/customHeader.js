const customHeader = (req, res, next) => {
  console.log(req.body)
  console.log(req.headers)
  try {
    const apikey = req.headers.api_key
    if (apikey === 'leifer-01') {
      next()
    } else {
      res.status(403)
      res.send({
        error: 'Api Key no es correcta'
      })
    }
  } catch (e) {
    res.status(403)
    res.send({
      error: e
    })
  }
}

module.exports = customHeader
