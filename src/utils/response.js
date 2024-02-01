export function sendSuccess ({ res, data, code = 200 }) {
  return res.status(code).json(data)
}

export function sendError ({
  res,
  code = 500,
  message = 'Error interno en el servidor',
  details = null
}) {
  return res.status(code).json({
    message,
    details
  })
}
