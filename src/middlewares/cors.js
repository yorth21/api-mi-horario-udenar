import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: (_, callback) => {
    return callback(null, true)
  }
})
