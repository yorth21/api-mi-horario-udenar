export function sendSuccess (res, code, message, data) {
  return res.status(code).json({
    success: true,
    message,
    data
  })
}

export function sendError (res, code, message, details = null) {
  return res.status(code).json({
    success: false,
    error: {
      message,
      details
    }
  })
}
