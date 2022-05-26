class Response {
  static error(res, type, statusCode = 400, additionalData = {}) {
    res
      .status(statusCode)
      .json({
        status: 'error',
        data: {
          type,
          ...additionalData
        }
      })
  }

  static ok(res, data, statusCode = 200) {
    res
      .status(statusCode)
      .json({
        status: 'ok',
        data: data
      })
  }
}

export default Response
